$(document).ready(function () {
  $(this).scrollTop(0);

  $(".navbar-btn-platform").click(function () {
    $(".navbar-btn-platform").addClass("show");
  });

  $(".nav-submenu").click((event) => {
    event.stopPropagation();
    $(".navbar-btn-platform").removeClass("show");
  })

  $("header").mouseleave(function () {
    $(".navbar-btn-platform").removeClass("show");
  });

  $(".hamburger").click(() => {
    $(".hamburger").toggleClass("active");
    $("header").toggleClass("open");
  });

  $("header .content .option.first").click(() => {
    $(this).toggleClass("active");
    $(".features-options").slideToggle(200);
  });

  $("footer.mobile-footer .btn-wrapper .header").click(function () {
    $(this).parent().toggleClass("active");
  });
});