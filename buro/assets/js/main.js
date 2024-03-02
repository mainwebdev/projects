$(function () {
  var OPTIONS = {};
  main(OPTIONS);
});

window.onYouTubeIframeAPIReady = function () {
  window.youTubeAPIReady = true;
}

function main(opts) {
  homeHeroSlider();
  homeAccordion();
  clientSlider();
  mobMenu();
  youtubeApiPrepare();
  workSlider();
  scroll();

  $(document).on('click', '.js-play-video-popup', function(e) {
    e.preventDefault();
    if(window.youTubeAPIReady) {
      var attrId = $(this).attr('href') || $(this).attr('data-href');
      var url = $(this).attr('data-src');
      var popup = $('#modal-video');
      var iframeParent = popup.find('.video-block')[0];
      var slideClass = $(attrId).data('slide-class');
      var baseClass = $(attrId).data('base-class');
      var player = getYoutubePlayer(iframeParent, null, url);

      $.fancybox.open({
        src: attrId,
        type: 'inline',
        slideClass: slideClass ? slideClass : '',
        baseClass: baseClass ? baseClass : '',
        touch: false,
        toolbar: false,
        afterClose: function() {
          player.destroy();
        }
      });
    }
  });
}

function getYoutubePlayer(iframeParent, opts, url) {
  var opts = opts || {};
  var iframe = createIframe(parseYoutubeUrl(url) + "?enablejsapi=1&controls=1");
  iframeParent.appendChild(iframe);

  var palyer = new YT.Player(iframe, {
    events: {
      onReady: function(event) {
        palyer.playVideo();
        typeof opts.onReady === 'function' && opts.onReady(event);
      },
      onStateChange: function (event) {
        typeof opts.onStateChange === 'function' && opts.onStateChange(event);
      }
    },
  });

  function createIframe(src) {
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.allow = 'autoplay; fullscreen';
    return iframe;
  }

  function parseYoutubeUrl(url) {
    if(url.includes("/watch")) {
      return "https://www.youtube.com/embed/" + parceVideoQueryParam(url, "v");
    }

    return url;
  }

  function parceVideoQueryParam(url, q) {
    return (url.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
  }

  return palyer;
}

function youtubeApiPrepare() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function homeHeroSlider() {
  var homeHeroBgSwiper = new Swiper('.home-hero__bg-slider .swiper-container', {
    slidesPerView: 1,
    effect: 'fade',
    autoplay: {
     delay: 5000,
    },
    fadeEffect: {
      crossFade: true
    },
  })
  
  var homeHeroBContentSwiper = new Swiper('.home-hero__content .swiper-container', {
    slidesPerView: 1,
    effect: 'fade',
    autoplay: {
     delay: 5000,
    },
    fadeEffect: {
      crossFade: true
    },

    pagination: {
      el: '.home-hero__swiper-pagination',
      clickable: true,
    },

    thumbs: {
      swiper: homeHeroBgSwiper
    }

  })   
}

function homeAccordion() {
	$('.what-do-item__head, .faq-item__head').click(function(e) {
    if ($(this).parent().hasClass("open")) {
      $(".what-do-item, .faq-item").removeClass("open");
      $(".what-do-item__main, .faq-item__main").slideUp(); 
    } else {
      $(".what-do-item, .faq-item").removeClass("open");
      $(".what-do-item__main, .faq-item__main").slideUp();
      $(this).parent().addClass("open");
      $(this).parent().find(".what-do-item__main, .faq-item__main").slideDown();
    }
    
	});
}

function clientSlider() {
  var clientAvatarSwiper = new Swiper('.clients-say__slider-avatar .swiper-container', {
    slidesPerView: 1,
    centeredSlides: true,
    initialSlide: 2,
    // loop: true,
    centeredSlides: true,
    spaceBetween: 20,

    breakpoints: {
      576: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
    },

    on: {
      transitionEnd: function (swiper) {
        setTimeout(function() {
          $(".clients-say__slider-avatar .swiper-slide").removeClass("swiper-slide-surrounds swiper-slide-active-next swiper-slide-active-prev");
          $(".clients-say__slider-avatar .swiper-slide-active").next().addClass("swiper-slide-surrounds swiper-slide-active-next");
          $(".clients-say__slider-avatar .swiper-slide-active").prev().addClass("swiper-slide-surrounds swiper-slide-active-prev");
        }, 50)
      }
    },
  })
  
  var clientContentSwiper = new Swiper('.clients-say__slider-content .swiper-container', {
    slidesPerView: 1,
    watchOverflow: true,
    initialSlide: 2,
    centeredSlides: true,
    // loop: true,

    pagination: {
      el: '.clients-say__swiper-pagination',
      clickable: true,
    },

    on: {
      transitionEnd: function (swiper) {
        setTimeout(function() {
          $(".clients-say__slider-avatar .swiper-slide").removeClass("swiper-slide-surrounds swiper-slide-active-next swiper-slide-active-prev");
          $(".clients-say__slider-avatar .swiper-slide-active").next().addClass("swiper-slide-surrounds swiper-slide-active-next");
          $(".clients-say__slider-avatar .swiper-slide-active").prev().addClass("swiper-slide-surrounds swiper-slide-active-prev");
        }, 50)
      },
      afterInit: function (swiper) {
        setTimeout(function() {
          $(".clients-say__slider-avatar .swiper-slide").removeClass("swiper-slide-surrounds swiper-slide-active-next swiper-slide-active-prev");
          $(".clients-say__slider-avatar .swiper-slide-active").next().addClass("swiper-slide-surrounds swiper-slide-active-next");
          $(".clients-say__slider-avatar .swiper-slide-active").prev().addClass("swiper-slide-surrounds swiper-slide-active-prev");
        }, 50)
      },
    },

  }) 

  clientContentSwiper.on('slideChange', function () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    clientAvatarSwiper.slideTo(activeIndex);
  });

  clientAvatarSwiper.on('slideChange', function () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    clientContentSwiper.slideTo(activeIndex);
  });


}

function mobMenu() {
  $(".menu-btn").on("click", function(e) {
    e.preventDefault();
    $(".mob-menu").toggleClass("show");
    $(this).toggleClass("close-menu");
  });
}

function workSlider() {
  var mySwiper = new Swiper('.our-works__swiper .swiper-container', {
    loop: true,
    slidesPerView: "auto",
    resistanceRatio: 0,
    breakpoints: {
      767: {
        slidesPerView: 3,
      }
    }
  })     
}

function scroll() {
  $(".js-scroll").on("click", function(e) {
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) { 
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); 
    }
    return false; 
  });
}