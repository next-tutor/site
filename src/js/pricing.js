
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', registerFaqAccordion);
} else {
  registerFaqAccordion();
}
