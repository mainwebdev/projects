$(function () {
  var OPTIONS = {
    supportsPassive: false,
    MEDIA_MAX: {
      desktop_lg: '1439.98px',
      desktop: '1199.98px',
      desktop_sm: '991.98px',
      tablets_lg: '899.98px',
      tablets: '767.98px',
      tablets_sm: '599.98px',
      phones_lg: '575.98px',
      phones: '374.98px',
      phones_sm: '319.98px',
    },
    MEDIA_MIN: {
      desktop_lg: '1440px',
      desktop: '1200px',
      desktop_sm: '992px',
      tablets_lg: '900px',
      tablets: '768px',
      tablets_sm: '600px',
      phones_lg: '576px',
      phones: '375px',
      phones_sm: '320px',
    },
    getMaxBreakPoint: function (point) {
      if (point) {
        return window.matchMedia('(max-width: ' + point + ')');
      }
    },
    getMinBreakPoint: function (point) {
      if (point) {
        return window.matchMedia('(min-width: ' + point + ')');
      }
    },
  };

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function () {
        OPTIONS.supportsPassive = true;
      },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  main(OPTIONS);
});

function main(opts) {
  var options = $.extend(opts, {
    players: new TabPlayer(),
  });
  window.onYouTubeIframeAPIReady = function () {
    productionTabsPlayVideo(options);
  };
  videoApiPrepare();
  mobMenuHeight(options);
  moveAnimation(options);
  reviewsSlider();
  activitySlider();
  activitySourcesSlider();
  initCustomBarMain();
  mobMenu();
  productionTabs(options);
  caseFunctionality(options);
  caseNavFunctionality(options);
  scrollToFunctionality();
  sendForm();
}

function caseNavFunctionality(opts) {
  var nav = $('.cases__nav');
  var navContentClone = nav.find('.cases__nav-inner').clone();
  var breakPoint = opts.getMaxBreakPoint(opts.MEDIA_MAX.tablets);
  var casesNavBar = null;

  var initCaseNavBar = function () {
    casesNavBar = new SimpleBar($('.cases__nav-inner')[0], {
      forceVisible: true,
    });
  };

  var destroyCaseNavBar = function () {
    casesNavBar.unMount();
    nav.find('.cases__nav-inner').remove();
    nav.append(navContentClone.clone());
    casesNavBar = null;
  };

  if (breakPoint.matches) {
    initCaseNavBar();
  }

  breakPoint.addListener(function (e) {
    if (e.matches) {
      initCaseNavBar();
    } else {
      destroyCaseNavBar();
    }
  });
}

function caseFunctionality(opts) {
  var breakPoint = opts.getMaxBreakPoint(opts.MEDIA_MAX.tablets);
  var caseCtx = $('#cases');
  var caseNav = caseCtx.find('.cases__nav');
  var caseBtns = caseNav.find('.cases__nav-btn');
  var mySwiper = null;

  var initialSlide = 1;

  var mySwiper2 = initCasesSwiper2();

  if (caseCtx.length && caseBtns.length) {
    mySwiper = initCasesSwiper(breakPoint.matches);

    breakPoint.addListener(function (e) {
      mySwiper && mySwiper.destroy(true, true);
      mySwiper = initCasesSwiper(breakPoint.matches);
      mySwiper.update();
    });

    caseBtns.eq(initialSlide).addClass('active');
    mySwiper.slideTo(initialSlide + 1, 0, false); //need add one to correct sliding

    caseNav.on('mouseover', '.cases__nav-btn', function () {
      var self = $(this);

      caseNav.find('.cases__nav-btn').each(function (indx, caseBtn) {
        var currBtn = $(caseBtn);
        currBtn.is(self) ? (currBtn.addClass('active'), mySwiper.slideTo(indx + 1)) : currBtn.removeClass('active');
      });
    });
  }

  function initCasesSwiper(isMobile) {
    var casesSwiper = new Swiper(caseCtx.find('.cases__slider .swiper-container'), {
      loop: true,
      slidersPerView: 1,
      // autoHeight: true,
      effect: isMobile ? 'slide' : 'fade',
      speed: 500,
      fadeEffect: isMobile
        ? null
        : {
            crossFade: true,
          },
      pagination: {
        el: caseCtx.find('.cases__pagination'),
        type: 'bullets',
      },
      thumbs: {
        swiper: mySwiper2,
      },
      on: {
        slideChange: function () {
          if (mySwiper) {
            var activeIndex = mySwiper.activeIndex;

            caseNav.find('.cases__nav-btn').each(function (indx, caseBtn) {
              var currBtn = $(caseBtn);
              if (indx === activeIndex - 1) {
                currBtn.addClass('active');
              } else {
                currBtn.removeClass('active');
              }
            });
          }
        },
      },
    });

    return casesSwiper;

  }

  function initCasesSwiper2(isMobile) {
    var casesSwiper2 = new Swiper('.cases-other-swiper .swiper-container', {
      effect: isMobile ? 'slide' : 'fade',
      fadeEffect: isMobile
      ? null
      : {
          crossFade: true,
        },
      watchSlidesVisibility: true,
      simulateTouch: false,
    });
    return casesSwiper2;
  }
}

function mobMenu() {
  $('.mob-burger').click(function (e) {
    e.preventDefault();
    var self = $(this);
    var header = self.closest('.header');
    var body = $('body');

    if (header.attr('data-show-menu') === 'true') {
      body.css({ overflow: '' });
      header.attr('data-show-menu', false);
    } else {
      body.css({ overflow: 'hidden' });
      header.attr('data-show-menu', true);
    }
  });
}

function reviewsSlider() {
  var rSlider = document.querySelector('#reviews-slider');
  if (rSlider) {
    var mySwiper = new Swiper(rSlider.querySelector('.swiper-container'), {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 60,
      navigation: {
        nextEl: rSlider.querySelector('.section-slider-next'),
        prevEl: rSlider.querySelector('.section-slider-prev'),
      },
      pagination: {
        el: document.querySelector('.reviews__slider-pagination'),
        type: 'bullets',
      },
    });
  }
}

function activitySlider() {
  var aSlider = document.querySelector('#activity-advantages');
  if (aSlider) {
    var mySwiper = new Swiper(aSlider.querySelector('.swiper-container'), {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: aSlider.querySelector('.section-slider-next'),
        prevEl: aSlider.querySelector('.section-slider-prev'),
      },
      breakpoints: {
        767.98: {
          spaceBetween: 40,
        },
        899.98: {
          slidesPerView: 4.4,
          spaceBetween: 40,
        },
      },
      pagination: {
        el: aSlider.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
    });
  }
}

function activitySourcesSlider() {
  var aSlider = document.querySelector('#activity-sources');
  if (aSlider) {
    var mySwiper = new Swiper(aSlider.querySelector('.swiper-container'), {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 40,
      navigation: {
        nextEl: aSlider.querySelector('.section-slider-next'),
        prevEl: aSlider.querySelector('.section-slider-prev'),
      },
      breakpoints: {
        899.98: {
          slidesPerView: 4,
        },
      },
      pagination: {
        el: aSlider.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
    });
  }
}

function initCustomBarMain() {
  var barsArray = Array.from(document.querySelectorAll('[data-simple-bar]'));

  barsArray.forEach(function (el, i) {
    var opts = {
      autoHide:
        el.classList.contains('production-tabs__controls') || el.classList.contains('cases__nav') ? true : false,
    };

    if (el) barsArray[i] = initCustomBar(el, opts);
  });

  return barsArray;
}

function initCustomBar(container, opts) {
  if (container) return new SimpleBar(container, opts);
}

function mobMenuHeight(opts) {
  setMenuHeight();
  window.addEventListener(
    'resize',
    function () {
      setMenuHeight();
    },
    opts.supportsPassive ? { passive: true } : false
  );

  window.addEventListener(
    'scroll',
    function () {
      setMenuHeight();
    },
    opts.supportsPassive ? { passive: true } : false
  );
}

function setMenuHeight() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

function productionTabs(opts) {
  var prTabsCtx = $('.production-tabs');
  var prBtns = prTabsCtx.find('.production-tabs__btn');
  var prViews = prTabsCtx.find('.production-tabs__view');
  var tabPlayer = opts.players;

  prBtns.click(function (e) {
    e.preventDefault();
    var self = $(this);
    var dataTab = self.attr('data-tab');
    var next = prViews.eq(dataTab);
    var prev = prViews.filter(function (_, v) {
      return $(v).hasClass('active');
    });
    var prevBtn = prBtns.filter(function (_, v) {
      return $(v).hasClass('active');
    });

    tabPlayer && tabPlayer.pause(prViews.index(prev));
    prevBtn.removeClass('active');
    self.addClass('active');
    prev.removeClass('active').css('display', 'none');
    next.css('display', 'block');
    reflow(next[0]);
    next.addClass('active');
  });
}

function productionTabsPlayVideo(opts) {
  var prTabsCtx = $('.production-tabs');
  var playBtns = prTabsCtx.find('.production-tabs__view .play');
  var tabPlayer = opts.players;

  playBtns.click(function (e) {
    e.preventDefault();
    var self = $(this);
    var tab = self.closest('.production-tabs__view');
    var dataTab = tab.attr('data-tab');

    if (!(tab.attr('data-play') === 'true')) {
      tab.attr('data-play', true);
    }
    tabPlayer && tabPlayer.play(dataTab);
  });
}

function TabPlayer() {
  var iframes = $('.production-tabs__view iframe');
  var iframesArr = [];
  var players = [];

  iframes.each(function (_, iframe) {
    iframesArr.push(iframe);
  });

  this.play = function (playerIndex) {
    players[playerIndex] = videoPlayFunctioanality(iframesArr[playerIndex]);
  };

  this.pause = function (playerIndex) {
    if (players[playerIndex] && typeof players[playerIndex].pause === 'function') {
      players[playerIndex].pause();
    } else if (players[playerIndex] && typeof players[playerIndex].pauseVideo === 'function') {
      players[playerIndex].pauseVideo();
    }
  };
}

function reflow(element) {
  return element.offsetHeight;
}

var players = {
  youtube: 'youtube',
  vimeo: 'vimeo',
};

function videoApiPrepare() {
  addScriptTag('https://player.vimeo.com/api/player.js');
  addScriptTag('https://www.youtube.com/iframe_api');
}

function videoPlayFunctioanality(iframe) {
  var url = $(iframe).attr('data-src');

  switch (getPlayerName(url)) {
    case players.vimeo:
      return playVimeoPlayer(url, iframe);
    case players.youtube:
      return playYoutubePlayer(url, iframe);
    default:
      break;
  }
}

function playYoutubePlayer(url, iframe) {
  iframe.src = parseYoutubeUrl(url) + '?showinfo=0&enablejsapi=1';
  return new YT.Player(iframe, {
    events: {
      onReady: function (event) {
        event.target.playVideo();
      },
    },
  });
}

function parseYoutubeUrl(url) {
  if (url.includes('/watch')) {
    return 'https://www.youtube.com/embed/' + getQuery(url, 'v');
  }

  return url;
}

function getQuery(url, q) {
  return (url.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function playVimeoPlayer(url, iframe) {
  iframe.src = url + '?autoplay=1&title=0&byline=0&portrait=0&badge=0';
  var player = new Vimeo.Player(iframe);
  player.play();
  return player;
}

function getPlayerName(url) {
  var player = '';
  for (var p in players) {
    if (url.includes(players[p])) {
      player = p;
    }
  }
  return player;
}

function addScriptTag(url) {
  var tag = document.createElement('script');
  tag.src = url;
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  return tag;
}

function scrollToFunctionality() {
  $('.scroll-to').click(function (e) {
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    var body = $('body');

    if ($(scroll_el).length !== 0) {
      $('.header').attr('data-show-menu', false);
      body.css({ overflow: '' });

      $('html, body').animate(
        {
          scrollTop: $(scroll_el).offset().top,
        },
        1000
      );
    }
    return false;
  });
}

function moveAnimation(opts) {
  var breakPoint = opts.getMaxBreakPoint(opts.MEDIA_MAX.tablets);
  var deskAnim = desktopMoveAnimation(opts);
  var mobAnim = mobileMoveAnimation(opts);

  moveAnimationHandler();
  breakPoint.addListener(moveAnimationHandler);

  function moveAnimationHandler(e) {
    var target = e ? e.target : breakPoint;
    if (target.matches) {
      deskAnim.destroy(function () {
        mobAnim.init();
      });
    } else {
      mobAnim.destroy(function () {
        deskAnim.init();
      });
    }
  }
}

function desktopMoveAnimation() {
  var anim;

  function hero(event) {
    var ctx = $('.hero');
    var offset = ctx.offset();
    var top = offset.top;
    var left = offset.left;
    var move = ctx.find('.hero__bg-desk .move');
    var normalizeX = ctx.innerWidth() / 2;
    var normalizeY = ctx.innerHeight() / 2;

    gsap.to(move, {
      duration: 0,
      x: event.pageX - left - normalizeX,
      y: event.pageY - top - normalizeY,
      ease: 'back.out(2)',
    });
  }

  function cases(event) {
    var ctx = $('.cases');
    var offset = ctx.offset();
    var top = offset.top;
    var left = offset.left;
    var move = ctx.find('.move');
    var normalizeX =
      ctx.innerWidth() / 2 - move[0].getBoundingClientRect().width + move[0].getBoundingClientRect().width / 1.7;
    var normalizeY = ctx.innerHeight() / 2 - move[0].getBoundingClientRect().height;

    gsap.to(move, {
      duration: 0.3,
      x: event.pageX - left - normalizeX,
      y: event.pageY - top - normalizeY,
      ease: 'back.out(2)',
    });
  }

  function reviews(event) {
    var ctx = $('.reviews');
    var offset = ctx.offset();
    var top = offset.top;
    var left = offset.left;
    var move = ctx.find('.move');
    var normalizeX = ctx.innerWidth() / 2 - (move[0].getBoundingClientRect().width / 2) * 0.07;
    var normalizeY = ctx.innerHeight() / 2 - (move[0].getBoundingClientRect().height / 3.5) * 2.4;

    gsap.to(move, {
      duration: 0.3,
      x: event.pageX - left - normalizeX,
      y: event.pageY - top - normalizeY,
      ease: 'back.out(2)',
    });
  }

  function activity(event) {
    var ctx = $('.activity');
    var offset = ctx.offset();
    var top = offset.top;
    var left = offset.left;
    var move = ctx.find('.activity__bg-desk .move');
    var normalizeX = ctx.innerWidth() / 2 + move[0].getBoundingClientRect().width;
    var normalizeY = ctx.innerHeight() / 2 + move[0].getBoundingClientRect().height / 5;

    gsap.to(move, {
      duration: 0.3,
      x: event.pageX - left - normalizeX,
      y: event.pageY - top - normalizeY,
      ease: 'back.out(2)',
    });
  }

  return {
    init: function () {
      !anim &&
        (anim = interact('.wrapper').on('move', function (event) {
          hero(event);
          cases(event);
          reviews(event);
          activity(event);
        }));
    },
    destroy: function (cb) {
      anim && (anim.unset(), (anim = undefined));
      typeof cb === 'function' && cb();
    },
  };
}

function mobileMoveAnimation(opts) {
  var supportsPassive = opts.supportsPassive;
  var hero = $('.hero');
  var heroMove = hero.find('.hero__bg-mob .move');
  var cases = $('.cases');
  var casesMove = cases.find('.move');
  var reviews = $('.reviews');
  var reviewsMove = reviews.find('.move');
  var activity = $('.activity');
  var activityMove = activity.find('.activity__bg-mob .move');
  var dur = 0.2;

  var handler = function (e) {
    var top = $(window).scrollTop();
    var middle = top + $(window).height() / 2;

    if (top < hero.offset().top + hero.innerHeight()) {
      var h = Number(hero.find('.hero__bg-mob').attr('height'));
      var perc = Math.round(((top - hero.offset().top) / $('.hero__bg').height()) * 100);
      var pos = perc * (h / 100);

      pos < h * 2 &&
        gsap.to(heroMove, {
          duration: dur,
          x: 0,
          y: pos,
          ease: 'back.out(2)',
        });
    }

    if (middle - cases.offset().top + 10 >= 0) {
      var h = Number(cases.find('svg').attr('height'));
      var perc = Math.round(((middle - cases.offset().top) / $('.cases__bg').height()) * 100);
      var pos = perc * (h / 100);

      pos < h * 2 &&
        gsap.to(casesMove, {
          duration: dur,
          x: 0,
          y: pos,
          ease: 'back.out(2)',
        });
    }

    if (middle - reviews.offset().top + 110 >= 0) {
      var h = Number(reviews.find('svg').attr('height'));
      var perc = Math.round(((middle - reviews.offset().top + 100) / $('.reviews__bg').height()) * 100);
      var pos = perc * (h / 100);

      pos < h * 2 &&
        gsap.to(reviewsMove, {
          duration: dur,
          x: 0,
          y: pos,
          ease: 'back.out(2)',
        });
    }

    if (middle - activity.offset().top + 200 >= 0) {
      var h = Number(activity.find('.activity__bg-mob').attr('height'));
      var perc = Math.round(((middle - activity.offset().top + 200) / $('.activity__bg').height()) * 100);
      var pos = perc * (h / 100);

      pos < h * 2 &&
        gsap.to(activityMove, {
          duration: dur,
          x: 0,
          y: pos,
          ease: 'back.out(2)',
        });
    }
  };

  return {
    init: function () {
      window.addEventListener('scroll', handler, supportsPassive ? { passive: true } : false);
    },
    destroy: function (cb) {
      window.removeEventListener('scroll', handler);
      typeof cb === 'function' && cb();
    },
  };
}

function sendForm() {
  var form = $(".form");

  $(form).submit(function(e) {
    e.preventDefault();
    var $form = $(form);

    var captcha = grecaptcha.getResponse();

    if (!captcha.length) {
      $('#recaptchaError').text('* You did not pass the "I am not a robot" test');
    } else {
      $('#recaptchaError').text('');
        if ((captcha.length)) {
        $.ajax({
            type: 'POST',
            url: './sendForm.php',
            data: $form.serialize(),
            success: function() {
              // console.log("send form");
              $form[0].reset();
              $.fancybox.close();
            },
            error: function(jqXHR, textStatus, errorThrown) {
              // console.log("error send form");
            },
          });
        }  
      grecaptcha.reset();
    }

    return false;
  });
}

