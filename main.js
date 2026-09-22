// Shared across every page: the sticky nav's frosted-glass state, and a
// single warm glow that drifts down the page as you scroll — literally
// "the one lamp you carry with you," tying the whole site back to the
// app's own Safelight metaphor instead of a decorative background.
(function () {
  var nav = document.getElementById('nav');
  var ambient = document.querySelector('.ambient');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function render() {
    ticking = false;
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);

    if (ambient && !prefersReduced) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Travels from just under the hero down to just above the footer,
      // never quite reaching either edge so it always reads as a glow
      // rather than a hard-edged spotlight.
      var y = 12 + progress * 76;
      document.documentElement.style.setProperty('--ambient-y', y + '%');
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
})();
