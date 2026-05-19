// Footer mobile accordion
function registerFooterEvents() {
  const items = document.querySelectorAll('footer .category');
  items.forEach(item => {
    item.addEventListener('click', function () {
      const isActive = this.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) this.classList.add('active');
    });
  });
}

// Mobile hamburger menu
function registerHamburger() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    document.querySelector('header .inner-header')?.classList.toggle('open_sidebar');
    document.body.classList.toggle('no_overflow');
  });
}

// Close sidebar when a link is clicked
function registerSidebarLinks() {
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('header .inner-header')?.classList.remove('open_sidebar');
      document.body.classList.remove('no_overflow');
    });
  });
}

// Scroll-reveal via IntersectionObserver
function registerScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach(el => observer.observe(el));
}

// Scroll-to-top reset on page load
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  registerFooterEvents();
  registerHamburger();
  registerSidebarLinks();
  registerScrollReveal();
});
