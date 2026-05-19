// FAQ accordion
function registerFaqAccordion() {
  const items = document.querySelectorAll('.faq .item');
  items.forEach(item => {
    item.addEventListener('click', function () {
      const isActive = this.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) this.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', registerFaqAccordion);
