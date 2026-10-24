(() => {
  document.querySelectorAll('[data-highlight-section]').forEach((section) => {
    const gallery = section.querySelector('[data-highlight-gallery]');
    const dialog = section.querySelector('.highlights-dialog');
    const allGallery = section.querySelector('[data-all-highlights]');
    const openButton = section.querySelector('[data-highlights-show-all]');
    const closeButton = section.querySelector('[data-highlights-close]');
    if (!gallery || !dialog || !allGallery || !openButton || !closeButton) return;

    // Add new video figures to data-highlight-gallery; both views use that collection.
    const clips = Array.from(gallery.querySelectorAll('figure'));
    clips.forEach((clip, index) => {
      clip.querySelector('video')?.setAttribute('aria-label', `${section.dataset.filmLabel} ${index + 1}`);
    });
    const shuffled = [...clips];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
    }
    gallery.replaceChildren(...shuffled.slice(0, 3));
    openButton.hidden = clips.length === 0;

    const pauseVideos = (container) => {
      container.querySelectorAll('video').forEach((video) => video.pause());
    };
    openButton.addEventListener('click', () => {
      document.querySelectorAll('video').forEach((video) => video.pause());
      // Build once, with preload="none" so opening the collection doesn't fetch every clip.
      if (!allGallery.childElementCount) {
        allGallery.replaceChildren(...clips.map((clip) => clip.cloneNode(true)));
      }
      dialog.showModal();
      document.body.classList.add('highlights-dialog-open');
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      pauseVideos(allGallery);
      document.body.classList.remove('highlights-dialog-open');
    });
  });
})();
