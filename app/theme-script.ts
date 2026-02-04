export const themeScript = `
(function() {
  var key = 'endeavor-theme';
  var theme = localStorage.getItem(key);
  var system = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var dark = theme === 'dark' || (theme !== 'light' && system);
  if (dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;
