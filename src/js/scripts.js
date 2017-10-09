(function() {

  var toogleMenuBtn = document.querySelector('.main-nav__toggle'),
      nav          = document.querySelector('.main-nav');

  toogleMenuBtn.addEventListener('click', function() {
    if (nav.classList.contains('main-nav--open')) {
      nav.classList.remove('main-nav--open');
    } else {
      nav.classList.add('main-nav--open');
    }
  });

})();
