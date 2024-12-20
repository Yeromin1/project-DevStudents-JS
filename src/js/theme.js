const root = document.documentElement;
const themeSwitcher = document.getElementById('theme-switcher');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeSwitcher.checked = savedTheme === 'dark';
}

themeSwitcher.addEventListener('change', () => {
  const newTheme = themeSwitcher.checked ? 'dark' : 'light';

  root.setAttribute('data-theme', newTheme);

  localStorage.setItem('theme', newTheme);
});
