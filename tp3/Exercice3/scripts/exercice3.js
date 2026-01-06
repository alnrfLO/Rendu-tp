document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.nav-button-open');
  const nav = document.getElementById('main-nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const opened = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  // Close when clicking a nav link (on small screens)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'a' && window.innerWidth <= 979) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Click outside closes menu on small screens
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 979) {
      if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Escape closes the menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  // On resize ensure menu closed when enlarging
  window.addEventListener('resize', function () {
    if (window.innerWidth > 979) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});