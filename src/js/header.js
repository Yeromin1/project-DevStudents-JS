const toggleBtn = document.querySelector('.header__toggle-btn');
const mobMenu = document.querySelector('.nav');
const header = document.querySelector('header');
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  themeSwitcher.checked = savedTheme === 'dark';
}

themeSwitcher.addEventListener('change', () => {
  if (themeSwitcher.checked) {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      mobMenu.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
      document.documentElement.classList.remove('no-scroll');
    });
  });
});

toggleBtn.addEventListener('click', function () {
  this.classList.toggle('is-active');
  mobMenu.classList.toggle('is-open');
  document.documentElement.classList.toggle('no-scroll');
});

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    header.style.transform = 'translateY(-100%)';
    header.classList.remove('scroll');
  } else {
    header.style.transform = 'translateY(0)';
    header.classList.add('scroll');
  }

  if (window.scrollY === 0) {
    header.style.transform = 'translateY(0)';
    header.classList.remove('scroll');
  }

  lastScrollY = window.scrollY;
});
