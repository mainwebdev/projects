$(function() {
  var gallery = $('.gallery__ul');
  var reviews = $('.reviews__ul');
  var opts = {
    dots: false,
    arrows: true,
    autoplay: false,
    // centerMode: true,
    // slidesToShow: 3,
    slidesToScroll: 1,
  };

  var galleryOpts = jQuery.extend(true, {
    centerMode: false,
    slidesToShow: 1,
    prevArrow: $('.gallery-wrap .slider__control.prev'),
    nextArrow: $('.gallery-wrap .slider__control.next'),
  }, opts);

  var reviewsOpts = jQuery.extend(true, {
    // centerMode: true,
    // slidesToShow: 3,
    centerMode: false,
    // centerPadding: '60px',
    slidesToShow: 1,
    prevArrow: $('.reviews-ul-wrap .slider__control.prev'),
    nextArrow: $('.reviews-ul-wrap .slider__control.next'),
  }, opts);

  gallery.slick(galleryOpts);
  reviews.slick(reviewsOpts);

  reviews.on("beforeChange", function (event, slick, currentSlide, nextSlide){
    var slides = $('.reviews__li.slick-slide');
    var items = $('.reviews__li.slick-slide').filter(function(ind, el) {
      return !$(el).hasClass('slick-cloned');
    })

    items.each(function(ind, el) {

      if($(items[0]).hasClass('open')) {
        $(slides[items.length + 1]).addClass('open');
      } else {
        $(slides[items.length + 1]).removeClass('open');
      }

      if($(items[items.length - 1]).hasClass('open')) {
        $(slides[0]).addClass('open');
      } else {
        $(slides[0]).removeClass('open');
      }
    })
  });

  // аккордион
  $('.faq__li-question').click(function(e) {
    e.preventDefault();
    var current = $(this);
    $('.faq__li-question').each(function(ind, el) {
      if (!$(el).is(current)) {
        $(el).removeClass('active');
        $(el)
          .next()
          .slideUp();
      }
    });
    $(this).toggleClass('active');
    $(this)
      .next()
      .slideToggle();
  });
  // аккордион

  $('.training__tabs-btns li').click(function(e) {
    e.preventDefault();
    var current = $(this);
    var tabTitle = current.attr('data-title');
    var tabText = current.attr('data-text');

    $('.training__info-title').text(tabTitle);
    $('.training__info-text').text(tabText);

    $('.training__tabs-btns li').each(function(ind, el) {
      if ($(el).is(current)) {
        $('.training__tabs-view li').removeClass('active');
        $($('.training__tabs-view li')[ind]).addClass('active');
      }
    });
    $('.training__tabs-btns li').removeClass('active');
    current.addClass('active');
  });

  // слайдер в модалке
  var modalSlider = $('.modal-window__slider-ul');
  var modalOpts = {
    dots: true,
    customPaging: function(slider, i) {
      var dotBgSrc = $(slider.$slides[i]).find('img')[0].src;
      return '<img src="' + dotBgSrc + '" />';
    },
    appendDots: $('.modal-window__slider'),
    arrows: true,
    autoplay: false,
    fade: true,
    prevArrow: '<button class="slick-prev slick-arrow"><div class="slider__control-cont"><img src="./img/images/prev.svg" alt=""></div></button>',
    nextArrow: '<button class="slick-next slick-arrow"><div class="slider__control-cont"><img src="./img/images/next.svg" alt=""></div></button>',
  };

  var areaSlider = $('.area__ul.mob');
  areaSlider.slick({
    arrows: false,
    autoplay: false,
    dots: false,
    // slidesToShow: 1,
    slidesToScroll: 1,
  })

  // вызов модалки
  var trainersLink = $('.trainers__li-cont');
  var areaLink = $('.area__ul.desk .area__li-cont');
  var areaLinkMob = $('.area__ul.mob .area__li-cont');
  var galeryLink = $('.gallery__li-cont');

  trainersLink.click(onClickHandlerForModalOpen);
  areaLink.click(onClickHandlerForModalOpen);
  areaLinkMob.click(onClickHandlerForModalOpen);
  galeryLink.click(onClickHandlerForModalOpen);

  function onClickHandlerForModalOpen(e) {
    e.preventDefault();

    var that = $(this);
    var html = '';
    var curentInd = 0;
    var container;
    modalSlider.html();

    if (that.parents('.trainers__ul').length) {
      container = trainersLink;
    } else if (that.parents('.area__ul.desk').length) {
      container = areaLink;
    } else if (that.parents('.area__ul.mob').length) {
      container = areaLinkMob.filter(function(ind, el) {
        return !$(el).parents().hasClass('slick-cloned');
      });
    } else if (that.parents('.gallery__ul').length) {
      // клас для изменнения ширины слайда в модалке
      $('.modal-container.slider-modal').addClass('gallery-slide');
      container = galeryLink.filter(function(ind, el) {
        return !$(el).parents().hasClass('slick-cloned');
      });
    }

    container.each(function(ind, el) {
      if ($(el).is(that)) {
        curentInd = ind;
      }
      var data = getDataFromElem($(el));
      html += '<li class="modal-window__slider-li">';
      html += '<div class="modal-window__slider-li-inner">';
      html += '<div class="modal-window__slider-li-left"><div>';
      if (data.url) {
        html += '<img src="' + data.url + '" alt="">';
      }
      html += '</div></div><div class="modal-window__slider-li-right">';
      if (data.position) {
        html += '<span class="modal-window__slider-li-position">' + data.position + '</span>';
      }
      if (data.name) {
        html += '<h4 class="modal-window__slider-li-name">' + data.name + '</h4>';
      }
      if (data.desc) {
        html += '<div class="modal-window__slider-li-desc">' + data.desc + '</div>';
      }
      html += '</div></div></li>';
    });

    modalSlider.html(html);
    modalSlider.slick(modalOpts);
    modalSlider.slick('slickGoTo', curentInd);

    openModalOverlay();
    $('.modal-container.slider-modal').addClass('open-js');
  }

  // вызов модалки с формой
  $('.open-modal-js').click(function(e) {
    e.preventDefault();

    openModalOverlay();
    $('.modal-container.modal-order').addClass('open-js');
  })

  // footer mob elem

  $('.mob-hide .footer__nav-title').click(function(e) {
    e.preventDefault();
    var that = $(this)

    if($(window).width() < 767) {
      that.parent().toggleClass('active')
      that.next().slideToggle()
    }
  })

  $(window).resize(function() {
    if($(window).width() > 767) {
      $('.footer__nav-ul').css({
        display: ''
      })
    }
  })

  // закрытие модалки
  $('.modal-close').click(closeModalHandler);

  $('.modal-container').mouseup(function(e) {
    var div = $(".modal-window");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      closeModalHandler(e);
    }
  })

  function closeModalHandler(e) {
    e.preventDefault();
    var activePopup = $('.modal-container.open-js.slider-modal');
    $('.modal-container')
      .removeClass('open-js')
      .removeClass('success')
      .removeClass('gallery-slide');

    setTimeout(function() {
      if(activePopup.length) {
        modalSlider.slick('unslick');
        modalSlider.find('.modal-window__slider-li').remove();
      }
      openModalOverlay();
    }, 200);
  }

  function getDataFromElem(ctx) {
    return {
      url: ctx.find('img')[0] ? ctx.find('img')[0].src : null,
      position: ctx.find('.position')[0] ? ctx.find('.position')[0].textContent : null,
      name: ctx.find('.name')[0] ? ctx.find('.name')[0].textContent : null,
      desc: ctx.find('.desc')[0] ? ctx.find('.desc')[0].textContent : null,
    };
  }

  function openModalOverlay() {
    if (!$('.modal-overlay').length) {
      var wrapper = $('.wrapper');
      wrapper.append('<div class="modal-overlay"></div>');
      // $('.modal-overlay').click(closeModalHandler);
      $('body').css({ overflow: 'hidden' });
    } else {
      // $('.modal-overlay').click(closeModalHandler).unbind();
      $('.modal-overlay').remove();
      $('body').css({ overflow: '' });
    }
  }

  var areaMore = $('.area-more');
  var areaContainer = $('.area__ul.desk');
  var areaData = [
    {
      url: './img/images/area-1.jpg',
      name: 'Мой каток',
      desc: '',
    },
    {
      url: './img/images/area-2.jpg',
      name: 'Ледо',
      desc: 'Вегас Кунцево',
    },
    {
      url: './img/images/area-3.jpg',
      name: 'Овертайм',
      desc: 'Верейская 29 стр 137',
    },
    {
      url: './img/images/area-1.jpg',
      name: 'Мой каток',
      desc: '',
    },
    {
      url: './img/images/area-2.jpg',
      name: 'Ледо',
      desc: 'Вегас Кунцево',
    },
    {
      url: './img/images/area-3.jpg',
      name: 'Овертайм',
      desc: 'Верейская 29 стр 137',
    },
  ];

  areaMore.click(function(e) {
    e.preventDefault();

    areaLink.click(onClickHandlerForModalOpen).unbind();

    areaData.forEach(function(el, ind) {
      var areaHtml = '';
      areaHtml = '<li class="area__li"><a href="" class="area__li-cont">';
      if (el.url && el.url.length) {
        areaHtml += '<img src="' + el.url + '" alt="">';
      }
      areaHtml += '<div class="area__li-info">';
      if (el.name && el.name.length) {
        areaHtml += '<h4 class="area__li-title name">' + el.name + '</h4>';
      }
      if (el.desc && el.desc.length) {
        areaHtml += '<div class="area__li-desc desc">' + el.desc + '</div>';
      }
      areaHtml += '</div></a></li>';
      areaContainer.append(areaHtml);
    });

    areaLink = $('.area__ul.desk .area__li-cont');
    areaLink.click(onClickHandlerForModalOpen);
  });

  // scroll to
  $('.scroll-to').click(function(e) {
    e.preventDefault();
    var currentEl = $(this);

    if(currentEl.closest('.header').hasClass('active')) {
      currentEl.closest('.header').removeClass('active');
    }

    var scroll_el = currentEl.attr('href');
    if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1500);
    }
    return false;
  });

  $('.equipment__active-link').each(function(ind, el) {
    calculatePos($(el))
  })

  $('.equipment__active-link').click(function(e) {
    e.preventDefault();
    var current = $(this);
    var dataPos = calculatePos(current);
    var currentView = current.parent().next('.equipment__active-view');

    // прокрутка к элементу
    if (!current.parent().hasClass('active') && $(currentView).length != 0) {
      $('html, body').animate({ scrollTop: $(currentView).offset().top + currentView.height()/2  - $(window).height()/2 }, 700);
    }

    $('.equipment__active-link').each(function(ind, el) {
      if (!$(el).is(current)) {
        $(el)
          .parent()
          .removeClass('active');
      }
    });
    $(this)
      .parent()
      .toggleClass('active');
  });

  function calculatePos(current) {
    var currentOffset = current.offset();
    var currentView = current.parent().next('.equipment__active-view');
    var isleft = current.parent().attr('data-left');
    var currentViewOffset = currentView.offset();
    var currentArrow = current.parent().find('.equipment__active-line');
    var yLength = (currentViewOffset.top) - (currentOffset.top + current.innerHeight()/2)
    var xLength = currentViewOffset.left - currentOffset.left + 40;
    var gipLength = Math.sqrt(Math.pow(xLength,2) + Math.pow(yLength,2))
    var angle = Math.acos((Math.pow(yLength,2) + Math.pow(gipLength,2) - Math.pow(xLength,2)) / (2 * gipLength * yLength))
    if($(window).width() > 480) {
      angle = isleft === 'left' ? angle : -angle;
    }

    currentArrow.css({
      height: gipLength + 'px',
      transform: 'translate3d(-50%, 0%, 0) rotate(' + Math.round(toRadians(angle)) + 'deg)'
    })
    return {gipLength: gipLength, xLength: xLength, yLength: yLength, angle: Math.round(toRadians(angle))}
  }

  function toRadians(angle) {
    return angle * (180 / Math.PI);
  }

  $('input[type="tel"]').mask("+7 (999) 99-99-999", {placeholder:"+7 (___) __-__-___"});

  $('.modal-form__form').submit(function(e) {
    e.preventDefault();
    var that = $(this)
    var formParent = that.closest('.modal-order')
    formParent.addClass('success');
    that[0].reset();
  })

  function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
  }

  $('.reviews__btn').click(function(e) {
    e.preventDefault();

    var that = $(this);
    var thatParent = that
      .closest('.reviews__li')
      .addClass('open');
  })

  $('.reviews__li-close').click(function(e) {
    e.preventDefault();

    var that = $(this);
    var thatParent = that
      .closest('.reviews__li')
      .removeClass('open');
  })

  $('.reviews__text').mCustomScrollbar({
    contentTouchScroll: true,
    theme:"my-theme",
    scrollEasing: "linear",
    scrollbarPosition: "outside",
    scrollInertia: 300
  });

  // вызов header
  $('.menu-btn').click(function(e) {
    e.preventDefault()
    var that = $(this);
    var thatHeader = that
      .closest('.header')
      .toggleClass('active');
  })

  $(window).mouseup(function(e) {
    var div = $(".header");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.removeClass('active');
    }
  })

});
