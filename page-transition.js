(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showPage = () => {
    document.body.classList.remove('page-leaving');
    document.body.classList.add('page-ready');
  };

  const shouldTransition = (link) => {
    if (!link || reduceMotion) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;

    return true;
  };

  showPage();
  window.addEventListener('pageshow', showPage);

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!shouldTransition(link) || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-leaving');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 320);
  });
})();
