/* YouTube requires a valid page referer. file:// previews must not create iframes. */
(() => {
  const hosted = window.location.protocol === 'https:' || window.location.protocol === 'http:';
  document.querySelectorAll('.video-preview-card').forEach(card => {
    const button = card.querySelector('.video-play');
    const stage = card.querySelector('.video-stage');
    if (!button || !stage || !hosted) return;
    button.hidden = false;
    button.addEventListener('click', () => {
      const id = button.dataset.video;
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
      iframe.title = 'Embedded presentation recording';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.loading = 'eager';
      stage.replaceChildren(iframe);
      stage.classList.add('video-playing');
    });
  });
})();
