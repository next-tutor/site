
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


function registerHamburger() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    document.querySelector('header .inner-header')?.classList.toggle('open_sidebar');
    document.body.classList.toggle('no_overflow');
  });
}


function registerSidebarLinks() {
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('header .inner-header')?.classList.remove('open_sidebar');
      document.body.classList.remove('no_overflow');
    });
  });
}


function registerLazyDemoIframe() {
  const iframe = document.querySelector('.demo-iframe[data-src]');
  if (!iframe) return;

  const load = () => {
    if (iframe.src && iframe.src !== 'about:blank') return;
    iframe.src = iframe.dataset.src;
  };

  
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


window.scrollTo(0, 0);

let isVideoMode = false;

const init = () => {
  registerFooterEvents();
  registerHamburger();
  registerSidebarLinks();
  registerLazyDemoIframe();
  
  toggleDemoIframeMode(isVideoMode);

  const toggleBtn = document.getElementById('toggle-iframe-mode');
  if (toggleBtn) {
    toggleBtn.textContent = isVideoMode ? 'Switch to Interactive Mode' : 'Switch to Video Mode';
    toggleBtn.addEventListener('click', () => {
      isVideoMode = !isVideoMode;
      toggleDemoIframeMode(isVideoMode);
      toggleBtn.textContent = isVideoMode ? 'Switch to Interactive Mode' : 'Switch to Video Mode';
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function postModeToIframe(iframe, videoMode) {
  try {
    iframe.contentWindow.postMessage(
      { type: 'setAutoSwitch', enabled: videoMode },
      '*'
    );
  } catch (_) {}
}

function toggleDemoIframeMode(videoMode) {
  const iframe = document.querySelector('.demo-iframe[data-src]');
  if (!iframe) return;
  iframe.classList.toggle('video-mode', videoMode);
  if (videoMode) {
    if (!iframe.src || iframe.src === 'about:blank') {
      iframe.src = iframe.dataset.src;
      iframe.addEventListener('load', () => postModeToIframe(iframe, true), { once: true });
    } else {
      postModeToIframe(iframe, true);
    }
  } else {
    postModeToIframe(iframe, false);
  }
}
