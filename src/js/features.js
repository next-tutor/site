
function registerStickbox() {
  const stickybox = document.querySelector('.feature-details .sticky-box');
  if (!stickybox) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector('.feature-details .more-details')
            ?.classList.add('show');
          observer.unobserve(stickybox);
        }
      });
    },
    { threshold: [0.75, 1] }
  );

  observer.observe(stickybox);
}



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


function registerCarousel() {
  const wrapper = document.querySelector('.more-features .carousel-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const items = Array.from(wrapper.querySelectorAll('.carousel-item'));
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');
  if (!track || !items.length) return;

  function visibleCount() {
    if (window.innerWidth >= 1100) return 3;
    if (window.innerWidth >= 700) return 2;
    return 1;
  }

  // Prepend cloned last 3 items, and append cloned first 3 items for seamless infinite scroll
  const originalItems = items.filter(el => !el.classList.contains('cloned'));
  track.innerHTML = '';
  originalItems.forEach(item => track.appendChild(item));

  const lastClones = originalItems.slice(-3).map(el => {
    const clone = el.cloneNode(true);
    clone.classList.add('cloned');
    return clone;
  });
  lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

  const firstClones = originalItems.slice(0, 3).map(el => {
    const clone = el.cloneNode(true);
    clone.classList.add('cloned');
    return clone;
  });
  firstClones.forEach(clone => track.appendChild(clone));

  let current = 3;
  let isTransitioning = false;

  function update(animated = true) {
    const gap = 20;
    const itemW = originalItems[0].getBoundingClientRect().width + gap;
    
    if (animated) {
      track.style.transition = 'transform 0.35s ease';
    } else {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(-${current * itemW}px)`;
  }

  function handleTransitionEnd() {
    isTransitioning = false;
    const totalOriginal = originalItems.length;

    if (current >= totalOriginal + 3) {
      current = current - totalOriginal;
      update(false);
    } else if (current < 3) {
      current = current + totalOriginal;
      update(false);
    }
  }

  track.addEventListener('transitionend', handleTransitionEnd);

  prevBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    current--;
    update(true);
  });

  nextBtn?.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    current++;
    update(true);
  });

  window.addEventListener('resize', () => {
    update(false);
  });

  update(false);
}

const initFeatures = () => {
  registerStickbox();
  registerFeaturesItems();
  registerCarousel();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeatures);
} else {
  initFeatures();
}
