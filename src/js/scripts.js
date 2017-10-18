(function() {

  var toogleMenuBtn = document.querySelector('.main-nav__toggle'),
      nav           = document.querySelector('.main-nav');

  toogleMenuBtn.addEventListener('click', function() {
    if (nav.classList.contains('main-nav--open')) {
      nav.classList.remove('main-nav--open');
    } else {
      nav.classList.add('main-nav--open');
    }
  });

  // Carousel

  function carousel() {
    var width, // ширина слайда
      count, // кол-во видимых слайдов
      carousel = document.getElementById('carousel'),
      list = carousel.querySelector('.popular__list'),
      nextBtn = carousel.querySelector('.popular__next'),
      prevBtn = carousel.querySelector('.popular__prev'),
      position = 0, // текущий сдвиг влево
      slide = carousel.querySelectorAll('.product-card');

    var calcProp = function() {
      if ( windowWidth < 768 ) {
        width = 310;
        count = 1;
      } else if ( windowWidth >= 768 && windowWidth < 1200 ) {
        width = 374;
        count = 2;
      } else {
        width = 380;
        count = 3;
      }
      // Прячем кнопки управления если все слайды помещаются на экране
      if ( slide.length <= count ) {
        nextBtn.hidden = true;
        prevBtn.hidden = true;
      } else {
        nextBtn.hidden = false;
        prevBtn.hidden = false;
      }
    };

    var windowWidth = window.innerWidth;
    calcProp();

    window.addEventListener('resize', function(e){
      windowWidth = window.innerWidth;
      calcProp();
      position = 0;
      list.style.transform = 'translateX('+ position + 'px)';
    });

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if ( position == 0 ) {
        position = -width * (slide.length - count);
      } else {
        position = Math.min(position + width * count, 0);
      }
      list.style.transform = 'translateX('+ position + 'px)';
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (position == -width * (slide.length - count)) {
        position = 0;
      } else {
        position = Math.max(position - width * count, -width * (slide.length - count));
      }

      list.style.transform = 'translateX('+ position + 'px)';
    });
  }
  carousel();
})();
