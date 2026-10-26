(() => {
  // Add partners here once; both sport highlights pages share this section.
  const partners = [
    { name: 'Hurricane Media', logo: 'assets/media-partners/hurricane-media.png' },
    { name: "Le'quan Lee Photography", logo: 'assets/media-partners/lequan-lee-photography.png' },
    { name: 'Petersen Photography', logo: 'assets/media-partners/petersen-photography.png' },
    { name: "Steve's Sports", logo: 'assets/media-partners/steves-sports.png' },
    { name: 'Treehouse Photography', logo: 'assets/media-partners/treehouse-photography.png' }
  ];
  // Keep the carousel and popup alphabetical as new partners are added.
  partners.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const partnerCard = (partner) => `
    <figure class="thanks-partner">
      <div class="thanks-logo"><img src="${escapeHTML(partner.logo)}" alt="" loading="lazy"></div>
      <figcaption>${escapeHTML(partner.name)}</figcaption>
    </figure>
  `;
  const carouselCards = partners.map((partner) => `
    <span class="thanks-partner">
      <span class="thanks-logo"><img src="${escapeHTML(partner.logo)}" alt="" loading="eager" decoding="async"></span>
      <span class="thanks-partner-name">${escapeHTML(partner.name)}</span>
    </span>
  `).join('');

  document.querySelectorAll('[data-media-thanks]').forEach((container) => {
    container.innerHTML = `
      <section class="media-thanks" id="media-thanks" aria-labelledby="media-thanks-title">
        <div class="thanks-intro">
          <div>
            <p class="thanks-eyebrow">With appreciation // Photo &amp; Film</p>
            <h2 id="media-thanks-title">Behind <span>the lens.</span></h2>
          </div>
          <p class="thanks-copy">Thank you to the photographers and videographers who capture the work, the energy, and the moments that tell Kahsi’s story.</p>
        </div>
        <button class="thanks-carousel" type="button" data-thanks-open aria-label="View all photographers and videographers" aria-haspopup="dialog">
          <span class="thanks-track" aria-hidden="true">
            <span class="thanks-track-group">${carouselCards}</span>
            <span class="thanks-track-group">${carouselCards}</span>
          </span>
        </button>
        <div class="thanks-controls">
          <span>Tap the logos to meet everyone behind the lens.</span>
          <button class="thanks-motion" type="button" data-thanks-motion aria-pressed="false">Pause motion</button>
        </div>
        <p class="thanks-signoff">Your talent helps bring every moment to life. Thank you.</p>
        <dialog class="highlights-dialog thanks-dialog" aria-labelledby="thanks-dialog-title">
          <div class="highlights-dialog-header">
            <h2 id="thanks-dialog-title">Photographers &amp; Videographers</h2>
            <button class="button secondary" type="button" data-thanks-close autofocus>Close</button>
          </div>
          <div class="thanks-logos">${partners.map(partnerCard).join('')}</div>
        </dialog>
      </section>
    `;

    const section = container.querySelector('.media-thanks');
    const opener = section.querySelector('[data-thanks-open]');
    const dialog = section.querySelector('dialog');
    const motion = section.querySelector('[data-thanks-motion]');
    motion.addEventListener('click', () => {
      const paused = section.classList.toggle('thanks-paused');
      motion.setAttribute('aria-pressed', String(paused));
      motion.textContent = paused ? 'Resume motion' : 'Pause motion';
    });
    opener.addEventListener('click', () => {
      dialog.showModal();
      section.classList.add('thanks-modal-open');
      document.body.classList.add('thanks-dialog-open');
    });
    section.querySelector('[data-thanks-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      section.classList.remove('thanks-modal-open');
      document.body.classList.remove('thanks-dialog-open');
      opener.focus();
    });
  });
})();
