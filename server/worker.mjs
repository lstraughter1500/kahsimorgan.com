const json = (data, status = 200, extra = {}) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } });
let gameIds;
async function knownGame(request, env, id) {
  if (!gameIds) {
    // Reuse the public schedule as the authority; never accept arbitrary game IDs.
    gameIds = (async () => {
      const response = await env.ASSETS.fetch(new Request(new URL('/basketball-schedule.js', request.url)));
      if (!response.ok) throw new Error('Schedule unavailable');
      const source = await response.text();
      const data = source.match(/window\.KAHSI_BASKETBALL_SCHEDULE\s*=\s*(\[[\s\S]*?\n\]);/);
      if (!data) throw new Error('Schedule invalid');
      return new Set(JSON.parse(data[1]).map(game => game.id));
    })().catch(error => { gameIds = null; throw error; });
  }
  return (await gameIds).has(id);
}
async function hash(value) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    const match = url.pathname.match(/^\/api\/attendance\/([a-zA-Z0-9-]{1,80})$/);
    if (!match) return json({ error: 'Not found.' }, 404);
    if (!['GET', 'PUT'].includes(request.method)) return json({ error: 'Method not allowed.' }, 405, { Allow: 'GET, PUT' });
    const origin = request.headers.get('Origin');
    if ((origin && origin !== url.origin) || request.headers.get('Sec-Fetch-Site') === 'cross-site' || (request.method === 'PUT' && origin !== url.origin)) return json({ error: 'Use the attendance button on this website.' }, 403);
    const visitor = request.headers.get('X-Visitor-ID');
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitor || '')) return json({ error: 'A valid anonymous device identifier is required.' }, 400);
    if (!env.ATTENDANCE_DB) return json({ error: 'Attendance is not available yet. Please try again later.' }, 503);
    try {
      if (!await knownGame(request, env, match[1])) return json({ error: 'Game not found.' }, 404);
      const visitorHash = await hash(visitor);
      const id = match[1];
      const snapshot = env.ATTENDANCE_DB.prepare('SELECT COUNT(*) AS count, COALESCE(MAX(visitor_hash = ?), 0) AS going FROM attendance WHERE game_id = ?').bind(visitorHash, id);
      let row;
      if (request.method === 'PUT') {
        if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'JSON required.' }, 415);
        if (Number(request.headers.get('Content-Length')) > 128) return json({ error: 'Request too large.' }, 413);
        const raw = await request.text();
        if (raw.length > 128) return json({ error: 'Request too large.' }, 413);
        let body;
        try { body = JSON.parse(raw); } catch { return json({ error: 'Invalid request.' }, 400); }
        if (typeof body.going !== 'boolean' || Object.keys(body).length !== 1) return json({ error: 'Choose attending or canceling.' }, 400);
        // Rate limiting is enforced at the edge for both a device and its network.
        if (!env.ATTENDANCE_LIMITER) return json({ error: 'Attendance is temporarily unavailable.' }, 503);
        const ip = request.headers.get('CF-Connecting-IP') || 'local';
        const [deviceLimit, networkLimit] = await Promise.all([
          env.ATTENDANCE_LIMITER.limit({ key: 'visitor:' + visitorHash }),
          env.ATTENDANCE_LIMITER.limit({ key: 'network:' + await hash(ip) })
        ]);
        if (!deviceLimit.success || !networkLimit.success) return json({ error: 'Please wait a minute before trying again.' }, 429, { 'Retry-After': '60' });
        const mutation = body.going
          ? env.ATTENDANCE_DB.prepare('INSERT INTO attendance (game_id, visitor_hash) VALUES (?, ?) ON CONFLICT(game_id, visitor_hash) DO NOTHING').bind(id, visitorHash)
          : env.ATTENDANCE_DB.prepare('DELETE FROM attendance WHERE game_id = ? AND visitor_hash = ?').bind(id, visitorHash);
        // Atomic mutation and snapshot; repeated PUTs never duplicate an RSVP.
        const results = await env.ATTENDANCE_DB.batch([mutation, snapshot]);
        row = results[1].results[0];
      } else row = await snapshot.first();
      return json({ gameId: id, count: Number(row.count), going: Boolean(row.going) });
    } catch {
      return json({ error: 'Could not load or save attendance. Please try again.' }, 503);
    }
  }
};
