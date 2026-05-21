
function registerPlatformScroll() {
  const sections = document.querySelectorAll('.platform .features .feature');
  const stickyBackgrounds = document.querySelectorAll('.platform .sticky-bg');
  const firstFeatureBackground = document.querySelector('.platform .sticky-bg.feature1');
  const firstFeatureTextSection = document.querySelector('.platform .main.features .feature.feature1');
  if (!sections.length) return;

  let lastFeature = null;
  let hasPlayedFirstFeatureReveal = false;
  let hasPlayedFirstFeatureTextReveal = false;

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
        
        
        document.querySelectorAll('.platform .feature, .platform .sticky-phone').forEach(el => el.classList.remove('active'));
        stickyBackgrounds.forEach(el => el.classList.remove('active'));
        if (firstFeatureBackground) firstFeatureBackground.classList.remove('first-reveal-long');
        
        
        if (lastFeature) {
          if (lastFeature === 'feature1' && firstFeatureBackground && !hasPlayedFirstFeatureReveal) {
            firstFeatureBackground.classList.add('first-reveal-long');
            hasPlayedFirstFeatureReveal = true;
          }
          if (lastFeature === 'feature1' && firstFeatureTextSection && !hasPlayedFirstFeatureTextReveal) {
            hasPlayedFirstFeatureTextReveal = true;
            window.setTimeout(() => {
              firstFeatureTextSection.classList.add('text-reveal-played');
            }, 780);
          }
          document.querySelectorAll(`.platform .${lastFeature}`).forEach(el => el.classList.add('active'));
          document.querySelectorAll(`.platform .sticky-bg.${lastFeature}`).forEach(el => el.classList.add('active'));
        }
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', registerPlatformScroll);
} else {
  registerPlatformScroll();
}
