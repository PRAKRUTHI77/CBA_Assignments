export const preventRefresh = () => {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.tagName === 'FORM' && !form.hasAttribute('data-no-prevent')) {
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
  }, true);

  window.addEventListener('error', (e) => {
    e.preventDefault();
    console.error('Error caught:', e.error);
    return false;
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
    console.error('Unhandled promise rejection:', e.reason);
    return false;
  });
};

if (typeof window !== 'undefined') {
  preventRefresh();
}