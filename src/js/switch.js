$(() => {
  const activeClass = 'switch__button--active';
  const content = $('.switch__content');
  let active = $('.' + activeClass);

  const toggle = (el) => {
    active.removeClass(activeClass);
    content.removeClass(active.data('class'));
    el.addClass(activeClass);
    content.toggleClass('switch__content--rotate');
    active = el;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const el = $(e.target);
    toggle(el);
    handleSwitch();
  }

  const handleSwitch = () => {
    const width = active[0].offsetWidth;
    console.log(active);
    const position = active.position();
    $('.switch__slider').css({ "left": +position.left, "width": +width });
  }

  toggle(active);
  handleSwitch();

  $('.switch__button').click(handleClick);
});