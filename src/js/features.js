// Sticky box cover toggle
function registerStickbox() {
  const stickybox = document.querySelector('.feature-details .sticky-box');
  if (!stickybox) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        document.querySelector('.feature-details .more-details')
          ?.classList.toggle('show', entry.isIntersecting);
      });
    },
    { threshold: [0.75, 1] }
  );

  observer.observe(stickybox);
}

// Scroll-driven image swap inside feature-details
// Scroll-driven image swap inside feature-details using a robust center-detection mechanism
function registerFeaturesItems() {
  const sections = document.querySelectorAll('.feature-details .item');
  if (!sections.length) return;
  let lastFeature = null;

  function setActive() {
    document.querySelectorAll('.feature-details .item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.feature-details .item.${lastFeature}`)?.classList.add('active');
    document.querySelectorAll('.feature-details .sticky-box img').forEach(el => el.classList.remove('active'));
    document.querySelector(`.feature-details .sticky-box img.${lastFeature}`)?.classList.add('active');
  }

  function updateActiveFeature() {
    const viewportCenter = window.innerHeight / 2;
    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const curr = closestSection.dataset.swap;
      if (lastFeature !== curr) {
        lastFeature = curr;
        setActive();
      }
    }
  }

  let tick = false;
  function onScroll() {
    if (!tick) {
      window.requestAnimationFrame(() => {
        updateActiveFeature();
        tick = false;
      });
      tick = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  updateActiveFeature();
}

// Lightweight vanilla carousel for "Explore more features"
function registerCarousel() {
  const wrapper = document.querySelector('.more-features .carousel-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const items = Array.from(wrapper.querySelectorAll('.carousel-item'));
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');
  if (!track || !items.length) return;

  let current = 0;

  function visibleCount() {
    return window.innerWidth >= 900 ? 2 : 1;
  }

  function maxIndex() {
    return Math.max(0, items.length - visibleCount());
  }

  function update() {
    const gap = 20;
    const itemW = items[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${current * itemW}px)`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= maxIndex();
  }

  prevBtn?.addEventListener('click', () => { if (current > 0) { current--; update(); } });
  nextBtn?.addEventListener('click', () => { if (current < maxIndex()) { current++; update(); } });
  window.addEventListener('resize', () => { current = Math.min(current, maxIndex()); update(); });
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  registerStickbox();
  registerFeaturesItems();
  registerCarousel();
});
