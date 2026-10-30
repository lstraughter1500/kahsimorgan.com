/* Shared, anonymous game RSVPs. No counts or RSVP state are fabricated locally. */
window.KahsiAttendance = {
  attach(root, gameId) {
    const button = root.querySelector('.game-rsvp-button');
    const count = root.querySelector('.game-rsvp-count');
    const status = root.querySelector('.game-rsvp-status');
    const controller = new AbortController();
    let timer, stopped = false, busy = false, saved = null, visitor;
    const storageKey = 'kahsi-attendance-visitor-v1';
    try {
      visitor = localStorage.getItem(storageKey);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitor || '')) {
        visitor = crypto.randomUUID();
        localStorage.setItem(storageKey, visitor);
      }
    } catch {
      button.disabled = true;
      count.textContent = 'Attendance unavailable on this device.';
      status.textContent = 'Allow browser storage to remember your RSVP.';
      return () => {};
    }
    const endpoint = '/api/attendance/' + encodeURIComponent(gameId);
    function draw() {
      button.disabled = busy || !saved;
      button.setAttribute('aria-pressed', String(Boolean(saved?.going)));
      button.textContent = busy && saved ? 'Saving…' : saved?.going ? '✓ You’re Going!' : '🙌 I’m Going';
      if (saved) count.textContent = `${saved.count} ${saved.count === 1 ? 'fan' : 'fans'} planning to attend.`;
    }
    function schedule() {
      clearTimeout(timer);
      if (!stopped) timer = setTimeout(() => { if (document.hidden) schedule(); else refresh(); }, 10000);
    }
    async function request(method = 'GET', going) {
      const response = await fetch(endpoint, {
        method, cache: 'no-store', signal: controller.signal,
        headers: { 'X-Visitor-ID': visitor, ...(method === 'PUT' ? { 'Content-Type': 'application/json' } : {}) },
        ...(method === 'PUT' ? { body: JSON.stringify({ going }) } : {})
      });
      let data;
      try { data = await response.json(); } catch { throw new Error('Attendance is temporarily unavailable. Please try again.'); }
      if (!response.ok) throw new Error(data.error || 'Attendance is temporarily unavailable. Please try again.');
      if (data.gameId !== gameId || !Number.isSafeInteger(data.count) || data.count < 0 || typeof data.going !== 'boolean') throw new Error('Could not verify attendance. Please try again.');
      return data;
    }
    async function refresh() {
      if (stopped || busy) return;
      busy = true;
      try {
        const data = await request();
        if (stopped) return;
        saved = data;
        status.textContent = saved.going ? 'Thanks for supporting Kahsi! Tap again to cancel.' : '';
      } catch (error) {
        if (stopped) return;
        if (!saved) count.textContent = 'Attendance count unavailable.';
        status.textContent = saved ? 'Updates unavailable. Showing the last saved count; retrying shortly.' : error.message + ' Retrying shortly.';
      } finally {
        busy = false;
        if (!stopped) { draw(); schedule(); }
      }
    }
    const toggle = async () => {
      if (busy || !saved || stopped) return;
      busy = true;
      clearTimeout(timer);
      draw();
      status.textContent = 'Saving your selection…';
      try {
        const data = await request('PUT', !saved.going);
        if (stopped) return;
        saved = data;
        status.textContent = saved.going ? 'Thanks for supporting Kahsi! Tap again to cancel.' : 'Your RSVP has been canceled.';
      } catch (error) {
        if (stopped) return;
        // A lost response may follow a successful write. Read back before another toggle.
        saved = null;
        count.textContent = 'Checking your saved attendance…';
        status.textContent = error.message;
      } finally {
        busy = false;
        if (!stopped) {
          draw();
          if (!button.disabled && document.activeElement === document.body) button.focus({ preventScroll: true });
          schedule();
        }
      }
    };
    button.addEventListener('click', toggle);
    refresh();
    return () => { stopped = true; clearTimeout(timer); controller.abort(); button.removeEventListener('click', toggle); };
  }
};
