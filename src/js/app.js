import './bootstrap';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './switch';
import 'slick-carousel';
import 'lity';

$(() => {
  const body = $(document.body);
  const menuToggle = $('.header__menu-toggle');
  const menuClose = $('.mobile-menu__close');

  menuToggle.click((e) => {
    e.stopPropagation();
    body.addClass('mobile-menu-is-shown');
  });

  menuClose.click((e) => {
    body.removeClass("mobile-menu-is-shown");
  })

  $(".mobile-menu-overlay").on('click', (e) => {
    body.removeClass('mobile-menu-is-shown');
  })

  const handleToTop = () => {
    const offset = 100;
    if ($(window).scrollTop() > offset) {
      body.addClass('to-top');
    } else {
      body.removeClass('to-top');
    }
  }
  handleToTop();
  $(window).scroll(handleToTop);

  $('.button--to-top').click((e) => {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  })

  $('.testimonial-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $('.banners-slider').slick({
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [{
      breakpoint: 576,
      settings: "unslick"
    }]
  });
});