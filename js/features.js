const registerStickbox = function () {

  if (typeof window.IntersectionObserver !== 'undefined') {
    let options = {
      threshold: [0.75, 1]
    }

    const stickybox = document.querySelector('.feature-details .sticky-box');
    function handleIntersection(entries) {
      entries.map((entry) => {
        $(".feature-details .more-details").toggleClass("show", entry.isIntersecting)
      });
    }

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(stickybox);
  }
}


const registerFeaturesItems = function () {

  const sections = document.querySelectorAll(".feature-details .item");
  let lastFeature = null;

  function setActive() {
    $(`.feature-details .item`).removeClass("active");
    $(`.feature-details .item.${lastFeature}`).addClass("active");
  }

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currFeature = entry.target.dataset.swap;
        if (lastFeature !== currFeature) {
          lastFeature = currFeature;
          setActive();
        }
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersect, {
    threshold: 1,
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

}




$(document).ready(function () {
  registerStickbox();
  registerFeaturesItems();
});

