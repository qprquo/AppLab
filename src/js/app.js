import './bootstrap';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './switch';
import 'slick-carousel';


$(() => {
  const body = $('body');
  const menuToggle = $('.header__menu-toggle');
  menuToggle.click((e) => {
    body.addClass('mobile-menu-is-shown');
  })
  const closeMenu = $('.header__close');
  closeMenu.click((e) => {
    body.removeClass('mobile-menu-is-shown');
  });
  const handleToTop = () => {
    const offset = 100;
    if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) {
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
 


});