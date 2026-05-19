// Scroll-driven feature swap on the Platform page
function registerPlatformScroll() {
  const sections = document.querySelectorAll('.platform .features .feature');
  if (!sections.length) return;

  let lastFeature = null;

  function setActive() {
    document.querySelectorAll('.platform .feature').forEach(el => el.classList.remove('active'));
    if (lastFeature) {
      document.querySelectorAll(`.platform .${lastFeature}`).forEach(el => el.classList.add('active'));
    }
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const curr = entry.target.dataset.swap;
          if (lastFeature !== curr) {
            lastFeature = curr;
            setActive();
          }
        }
      });
    },
    { threshold: 1 }
  );

  sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', registerPlatformScroll);
