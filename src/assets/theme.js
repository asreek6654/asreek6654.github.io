// Default to the device's theme; remember an explicit choice across pages.
(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('theme'); } catch { /* Storage may be disabled. */ }
  const isDark = () => choice === 'dark' || (choice !== 'light' && system.matches);

  function apply() {
    root.dataset.theme = isDark() ? 'dark' : 'light';
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    button.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    button.querySelector('.theme-label').textContent = isDark() ? 'light' : 'dark';
  }

  apply(); // Runs before the stylesheet to avoid flashing the wrong theme.
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      choice = isDark() ? 'light' : 'dark';
      try { localStorage.setItem('theme', choice); } catch { /* The toggle still works. */ }
      apply();
    });
  });
  system.addEventListener('change', apply);
})();
