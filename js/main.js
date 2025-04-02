$(document).ready(function () {
  $(this).scrollTop(0);

  $(".navbar-btn-platform").click(function () {
    $("header").addClass("open-wide-menu");
  });

  $(".nav-submenu").click((event) => {
    event.stopPropagation();
    $(".navbar-btn-platform").removeClass("open-wide-menu");
  })

  // $("header").mouseleave(function () {
  //   $("header").removeClass("open-wide-menu");
  // });

  $(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('header').length) {
      $("header").removeClass("open-wide-menu");
    }
  });

  $(".hamburger").click(() => {
    $(".hamburger").toggleClass("active");
    $("header").toggleClass("open-side-menu");
  });

  $("header .content .option.first").click(() => {
    $(this).toggleClass("active");
    $(".features-options").slideToggle(200);
  });

  $("footer.mobile-footer .btn-wrapper .header").click(function () {
    $(this).parent().toggleClass("active");
  });
});