(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const preferenceKey = 'becca-portfolio-theme';
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(isDark));
    if (themeColor) themeColor.setAttribute('content', isDark ? '#17211d' : '#f6f7f4');
  }

  let savedTheme;
  try { savedTheme = localStorage.getItem(preferenceKey); } catch (_) { /* Storage may be unavailable. */ }
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemPreference.matches ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem(preferenceKey, nextTheme); } catch (_) { /* Theme still works for this visit. */ }
  });
})();
