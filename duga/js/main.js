$(document).ready(function() {

  if($('.contacts__form input').length > 0) {
    $('.contacts__form input').change(onChangeHandler);
    $('.contacts__form textarea').change(onChangeHandler);
  }

  function onChangeHandler(e) {
    if(e.target.value.length > 0) {
      $(e.target).parent().find('.placeholder').css({
        opacity: '0'
      })
    } else {
      $(e.target).parent().find('.placeholder').css({
        opacity: ''
      })
    }
  }


  $('.mob-btn').click(function(e) {
    e.preventDefault();
    $('.mob-menu').toggleClass('active');

    // фиксирует кнопку меню если меню активно
    if($('.mob-btn__container').length > 0) {
      $('.mob-btn__container').removeClass('position');
    }

    $(this).toggleClass('active');
  });

  $('.projects-section__catigory a').click(function(e) {
    e.preventDefault();
    $('.projects-section__catigory a').removeClass('active');
    $(this).addClass('active');
  });

  // mob-menu
  $('.mob-menu__nav > ul > li').each(function (indexInArray, valueOfElement) {
    var currentLink = $('.mob-menu__nav > ul > li > a').eq(indexInArray);
    currentLink.click(function(e) {
      if(currentLink.attr('href').length > 1) return;
      e.preventDefault();

      $('.mob-menu__nav > ul > li > a').each(function(ind, el) {
        if (indexInArray !== ind) {
          $(el)
            .next()
            .slideUp({
              duration: 500,
            });
        }
      });

      if (currentLink.next().length > 0) {
        currentLink.next().slideToggle({
          duration: 500,
        });
      }
    })
  });

  $(document).mouseup(function (e){
    var div = $(".mob-menu");
    if($(e.target).is('.mob-btn') || $(e.target).is('.mob-btn div')) return

    if (!div.is(e.target)
        && div.has(e.target).length === 0) {
      $('.mob-menu').removeClass('active');
      $('.mob-btn').removeClass('active');
    }
  });

  // slider on main page
  var sliderMain = $('.main-slider ul');
  if (sliderMain.length > 0) {
    var sliderMainOpts = {
      autoplay: false,
      dots: false,
      arrows: true,
      prevArrow: $('.main-slider__btns .main-slider__prev'),
      nextArrow: $('.main-slider__btns .main-slider__next'),
    };

    sliderMain.slick(sliderMainOpts);
  }

  // show-hide map on projects page
  $('.show-map').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('#map').toggleClass('show');
  });

  // show-hide info on single project page
  $('.show-info').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.show-js').slideToggle({
      duration: 500,
    });
  });

  // scroll to
  $('.scroll-from').click(function(e) {
    e.preventDefault();

    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top - $('.header').height() }, 500);
    }
    return false;
  });

  // show/hide header on scroll
  var lastKnownScrollY = 0;
  var currentScrollY = 0;

  $(window).scroll(function(e) {
    currentScrollY = window.pageYOffset;

    // header on index page transparent change
    if($('.hero-section').length > 0) {
      if(currentScrollY > $('.hero-section').innerHeight()) {
        $('.header').removeClass('transparent');
        $('.mob-btn__container').removeClass('position');
        $('.mob-btn').removeClass('white');

        if (currentScrollY < lastKnownScrollY) {
          clearHeaderElemsStyle();
        } else if (currentScrollY > lastKnownScrollY) {
          setHeaderElemsStyle();
        }

      } else {
        $('.header').addClass('transparent');
        // not hide if mob-menu active
        if(!$('.mob-menu').hasClass('active')) {
          $('.mob-btn__container').addClass('position');
        }
        $('.mob-btn').addClass('white');

        if(currentScrollY > $('.hero-section').innerHeight()/2) {
          setHeaderElemsStyle();
        } else {
          $('.header').css({
            transform: '',
          });
          $('.mob-btn').css({
            transform: '',
          });
        }
      }
    } else {
      if (currentScrollY < lastKnownScrollY) {
        clearHeaderElemsStyle();
      } else if (currentScrollY > lastKnownScrollY) {
        setHeaderElemsStyle();
      }
    }

    lastKnownScrollY = currentScrollY;
  });

  function clearHeaderElemsStyle() {
    $('.header').css({
      transform: 'translateY(0)',
    });
    $('.mob-btn').css({
      transform: 'translateY(0)',
    });
  }

  function setHeaderElemsStyle() {
    var headerHeight = $('.header').innerHeight();
    $('.header').css({
      transform: 'translateY(' + -headerHeight + 'px)',
    });

    // not hide if mob-menu active
    if(!$('.mob-menu').hasClass('active')) {
      $('.mob-btn').css({
        transform: 'translateY(' + -headerHeight + 'px)',
      });
    }
  }

  // close popup handler
  $('.popup-close').click(function(e) {
    e.preventDefault();
    $('body').css({overflow: ''})
    $(this)
      .parent('.popup')
      .removeClass('active');
  });

  // galery on single-project page
  var galeryImgs = Array.prototype.slice.call(document.querySelectorAll('.single-project__photos-item a'));
  var imgs = [];
  var photoSlider;

  if (galeryImgs.length > 0) {
    galeryImgs.forEach(function(el, i) {
      var img = $(el)
        .find('img')
        .attr('src');
      imgs.push(img);

      $(el).click(function(e) {
        e.preventDefault();
        $('body').css({overflow: 'hidden'})
        photoSlider.slick('slickGoTo', i);
        $('.popup-photo').addClass('active');
      });
    });

    var ul = getHtmlfromArrayImages(imgs)
    $('.popup-photo__slider').append(ul)
    photoSlider = $('.popup-photo__slider ul')
    photoSlider.slick({
      autoplay: false,
      dots: false,
      arrows: true,
      prevArrow: $('.popup-photo .popup-photo__slider-prev'),
      nextArrow: $('.popup-photo .popup-photo__slider-next'),
    })
  }
});

function getHtmlfromArrayImages(arr) {
  var ul = document.createElement('ul')
  arr.forEach(function(el, i) {
    var li = '<li><img src="' + el + '" ' + 'data-id="' + i + '" alt=""></li>'
    $(ul).append(li)
  })
  return ul
}