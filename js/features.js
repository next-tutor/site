$(document).ready(function () {
  var last = null;
  if (typeof window.IntersectionObserver !== 'undefined') {
    let options = {
      threshold: [0.5, 1]
    }
    const targets = document.querySelectorAll('.feature-details .item');
    const locker = document.querySelector('.sticky-box');
    function handleIntersection(entries) {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          last = entry.target.current;
          entry.target.current = entry.target.dataset.swap;
          $(".sticky-box ." + entry.target.current).addClass("active");
        } else {
          if (last !== entry.target.current) {
            $(".sticky-box ." + entry.target.current).removeClass("active");
          }
        }
      });
    }
    const observer = new IntersectionObserver(handleIntersection, options);
    targets.forEach(target => observer.observe(target));
  }
});

