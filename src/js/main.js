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

// Demo iframe — defer loading until near viewport
function registerLazyDemoIframe() {
  const iframe = document.querySelector('.demo-iframe[data-src]');
  if (!iframe) return;

  const load = () => {
    if (iframe.src && iframe.src !== 'about:blank') return;
    iframe.src = iframe.dataset.src;
  };

  // If iframe is in video-like mode, load immediately and skip lazy loading
  if (iframe.classList.contains('video-mode')) {
    load();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    load();
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          load();
          observer.unobserve(iframe);
        }
      });
    },
    { rootMargin: '200px' }
  );

  observer.observe(iframe);
}

// Scroll-to-top reset on page load
window.scrollTo(0, 0);

let isVideoMode = false; // false = interactive iframe mode

document.addEventListener('DOMContentLoaded', () => {
  registerFooterEvents();
  registerHamburger();
  registerSidebarLinks();
  registerScrollReveal();
  registerLazyDemoIframe();
  // Initialize iframe in interactive mode by default
  toggleDemoIframeMode(isVideoMode);
  // Setup toggle button event listener
  const toggleBtn = document.getElementById('toggle-iframe-mode');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isVideoMode = !isVideoMode;
      toggleDemoIframeMode(isVideoMode);
      toggleBtn.textContent = isVideoMode ? 'Switch to Interactive Mode' : 'Switch to Video Mode';
    });
  }
});

/**
 * Toggles the demo iframe between video-like mode and real iframe mode.
 * @param {boolean} videoMode - If true, iframe acts like a video (non‑pressable, loads immediately).
 */
function toggleDemoIframeMode(videoMode) {
  const iframe = document.querySelector('.demo-iframe[data-src]');
  if (!iframe) return;
  iframe.classList.toggle('video-mode', videoMode);
  if (videoMode) {
    // Load immediately and disable interaction
    iframe.src = iframe.dataset.src;
  } else {
    // Reset src to allow lazy loading if not already loaded
    if (!(iframe.src && iframe.src !== 'about:blank')) {
      iframe.src = 'about:blank';
    }
  }
}
