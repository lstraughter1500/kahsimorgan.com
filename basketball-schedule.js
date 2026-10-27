// Add confirmed fixtures here once: the homepage, full schedule, and countdown
// all read this list. Each fixture needs title, opponent, details, and an ISO date
// with its Eastern time offset (-05:00 in winter, -04:00 in summer).
window.KAHSI_BASKETBALL_SCHEDULE = [];

(() => {
  const containers = document.querySelectorAll('[data-basketball-schedule]');
  const fixtures = [...window.KAHSI_BASKETBALL_SCHEDULE]
    .filter((game) => Number.isFinite(Date.parse(game.date)))
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const render = () => {
    const now = Date.now();
    containers.forEach((container) => {
      const isUpcoming = container.dataset.basketballSchedule === 'upcoming';
      const games = isUpcoming
        ? fixtures.filter((game) => Date.parse(game.date) > now).slice(0, 5)
        : fixtures;
      if (!games.length) {
        container.innerHTML = `<div class="schedule-empty"><h3>${fixtures.length
          ? 'No upcoming games scheduled.'
          : 'Basketball schedule coming soon.'}</h3><p>${isUpcoming
          ? 'Check back for Kahsi’s upcoming games.'
          : 'The full schedule will be posted here once available.'}</p></div>`;
        return;
      }
      container.innerHTML = games.map((game) => `
        <article class="event-card">
          <time datetime="${escapeHTML(game.date)}">${escapeHTML(new Date(game.date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', timeZone: 'America/New_York'
          }))}</time>
          <strong>${escapeHTML(game.title)}</strong>
          <p>${escapeHTML(game.details)}</p>
        </article>
      `).join('');
    });
  };
  render();
  // Advance the next five games without needing a page reload.
  window.setInterval(render, 60000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) render();
  });
})();
