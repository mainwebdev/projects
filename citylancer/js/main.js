document.addEventListener('DOMContentLoaded', function() {
  var btns = Array.from(document.querySelectorAll('.mdc-button'));
  var textFields = Array.from(document.querySelectorAll('.mdc-text-field'));
  var header = document.querySelector('.header');
  var topAppBarElement = document.querySelector('.mdc-top-app-bar');
  var topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarElement);
  var select = Array.from(document.querySelectorAll('.mdc-select'));
  var slider =  Array.from(document.querySelectorAll('.mdc-slider'));
  var dialog =  Array.from(document.querySelectorAll('.mdc-dialog'));
  var switchControl =  Array.from(document.querySelectorAll('.mdc-switch'));

  btns.forEach(function(el) {
    mdc.ripple.MDCRipple.attachTo(el);
  });


  textFields.forEach(function(el) {
    mdc.textField.MDCTextField.attachTo(el);
  });

  select.forEach(function(el) {
    mdc.select.MDCSelect.attachTo(el);
  });

  switchControl.forEach(function(el) {
    mdc.switchControl.MDCSwitch.attachTo(el);
  });

  slider.forEach(function(el) {
    var thisSlider = mdc.slider.MDCSlider.attachTo(el);

    thisSlider.listen('MDCSlider:change', function(event) {
      var sliderValue = thisSlider.value;
      $(this).closest('.mdc-slider-wrap').find('.mdc-slider-val').text(sliderValue);
    });

    if(thisSlider.root_.classList.contains("mdc-slider--points")) {
      var values = ["0", "100", "250", "500", "1000", "2000", "3000", "5000"];
      var maxVal = "more";

      thisSlider.step = (Math.round((thisSlider.max / (values.length)) * 100)) / 100;

      thisSlider.listen('MDCSlider:input', function(event) {
        var ind = Math.ceil(thisSlider.value / thisSlider.step);
        ind = ind < values.length ? values[ind] : maxVal;

        $(thisSlider.root_).find(".mdc-slider__pin-value-marker--fake").text(ind);
      });
    }

  });

  // function colorSliderPoints(slider, event) {
  //   var sliderRoot = slider.root_;
  //   var track = slider.track_;
  //   var points = Array.from(sliderRoot.querySelectorAll(".mdc-slider__track-point"));
  //   var trackWidth = Math.round(parseFloat(getComputedStyle(track).width));
  //   var progress = track.style.transform
  //     ? track.style.transform.match(/\(.*?\)/g)[0].replace(/\(|\)/g, "")
  //     : parseFloat(sliderRoot.getAttribute("aria-valuenow")) / 100;

  //   points.forEach(function(el, i) {
  //     var left = Math.round(parseFloat(getComputedStyle(el).left.replace("px", "")) + 6);
  //     if(left < parseFloat(progress) * trackWidth) {
  //       el.style.backgroundColor = "#5ebb46";
  //     } else {
  //       el.style.backgroundColor = "#e5e5e5";
  //     }
  //   });
  // }



  dialog.forEach(function(el) {
    mdc.dialog.MDCDialog.attachTo(el);
  });


  document.addEventListener("scroll", function(e) {
    if(window.pageYOffset > 100) {
      // header.style.transition = 'background-color 0.3s';

      header.style.backgroundColor = 'rgba(255,255,255, 0.9)';
      $(".js-header-page").addClass("fixed");
    } else {
      // header.style.transition = '';
      header.style.backgroundColor = '';
      $(".js-header-page").removeClass("fixed");
    }
  });

  $(".mdc-text-field__icon").click(function() {
    var inputPass = $(this).parent().find("input");

    $(inputPass).toggleClass("visible");

    if ($(inputPass).hasClass("visible")) {
      $(inputPass).attr("type", "text");
    } else {
      $(inputPass).attr("type", "password");
    }
  });

  function tabBar(){
    if ($('.fag-tab-bar').length && $('.js-accordion-wrap-content').length) {
      var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.fag-tab-bar'));
      var contentEls = document.querySelectorAll('.js-accordion-wrap-content');
       tabBar.listen('MDCTabBar:activated', function(event) {
        // Hide currently-active content
        document.querySelector('.js-accordion-wrap-content.active').classList.remove('active');
        // Show content for newly-activated tab
        contentEls[event.detail.index].classList.add('active');
      });
    }

    // var dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));

    if ($('.signup-tab-bar').length && $('.js-accordion-wrap-content').length) {
      var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.fag-tab-bar'));
      var contentEls = document.querySelectorAll('.js-accordion-wrap-content');
       tabBar.listen('MDCTabBar:activated', function(event) {
        // Hide currently-active content
        document.querySelector('.js-accordion-wrap-content.active').classList.remove('active');
        // Show content for newly-activated tab
        contentEls[event.detail.index].classList.add('active');
      });
    }
  }

  tabBar();

  $(document).on("click", ".js-accordion .js-accordion-title", function () {
    if($(this).closest(".js-accordion").hasClass('active')){
      $('.js-accordion').each(function(){
        $(this).removeClass('active');
      });
      
    } else {
      $('.js-accordion').removeClass('active');
       
      $(this).closest(".js-accordion").addClass('active');
    }

    makeAccordion();
  });

  makeAccordion(); 
  


  function makeAccordion(){
    var speed = 300; 
 
    $('.js-accordion').each(function(){
      if($(this).hasClass('active')){
     
        $(this).find('.js-accordion-content').slideDown(speed);
      } else{
      
        $(this).find('.js-accordion-content').slideUp(speed);
      }
    });
  }

  function intSlider(){
    if($(window).width() < 992 && $('.js-mob-slider').length) {
      $('.js-mob-slider').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      });
    }
  }

  intSlider();

  
  $(document).on("click", ".btn-scroll", function (e) {
  	e.preventDefault();
  	var scroll_el = $(this).attr('href');
     if ($(scroll_el).length != 0) { 
     	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); 
     }
     return false; 
  });


  function tagBox(){

    var tagging_options = {
      "no-duplicate": true,
      "no-duplicate-callback": window.alert,
      "no-duplicate-text": "Duplicate tags",
      "type-zone-class": "type-zone",
      "tag-box-class": "tagging",
      "forbidden-chars": [",", ".", "_", "?"],
      "data-pre-tags-separator": "\n",
      "edit-on-delete": false,
      "no-spacebar": true,
      "tags-limit": 30,
      "case-sensitive": true,
    };
    if ($(".js-tagBox").length) {
      $(".js-tagBox").tagging(tagging_options);

      $(document).on("click", ".js-tagBox", function (e) {
        $(this).addClass("show-type-zone");
        $(".show-type-zone .type-zone").focus();
        $(".show-type-zone").focusout(function() {
          $(this).removeClass("show-type-zone");
        });
      });

      $('html, body').scrollTop(0);
      
      
    }
  }

  tagBox();
    

  $(document).on("click", ".js-tag-input", function () {
 
    $(".js-tag-input").addClass("active");
  });

  $(document).on("click", ".js-cookies-close", function (e) {
    e.preventDefault();
    $(this).parent().parent().addClass("hide");
  });

  $(document).on("click", ".js-next.step-1", function (e) {
    e.preventDefault();
    $(".hide-block.account-form.step-1").removeClass("show");
    $(".hide-block.account-form.step-2").addClass("show");
    $('html, body').scrollTop(0);
  });

  $(document).on("click", ".js-next.step-2", function (e) {
    e.preventDefault();
    $(".hide-block.account-form.step-2").removeClass("show");
    $(".hide-block.account-form.final").addClass("show");
    $('html, body').scrollTop(0);

  });

  $(document).on("click", ".js-prev.step-2", function (e) {
    e.preventDefault();
    $(".hide-block.account-form.step-2").removeClass("show");
    $(".hide-block.account-form.step-1").addClass("show");
    $('html, body').scrollTop(0);

  });

  $(document).on("click", ".js-menu-btn", function (e) {
    e.preventDefault();
    $(".side-menu").toggleClass("show");
    $(".overlay").toggleClass("show");
  });

  $(document).mouseup(function (event){ // событие клика по веб-документу
    var div = $(".side-menu"); // тут указываем ID элемента
    var div2 = $(".js-menu-btn");

    if (!clickOnElement(event, div) && !clickOnElement(event, div2)) {
      $(".side-menu").removeClass("show");
      $(".overlay").removeClass("show");
      isMenuOpen = false;
    }
  });

  function clickOnElement(event, $elem) {
    return Boolean($elem.is(event.target) || $elem.has(event.target).length);
  }

  function copyForm() {
    var radioId = 10;
    var radioName = 10;

    $('.js-add-new').click(function(e) {
      e.preventDefault();
      radioId++;
      radioName++;
      var ctx = {
        radioId: "radio-" + radioId,
        radioName: "radios-" + radioName,
      }
      var jobItem = getTemplate('hbs-job-item', ctx);
      $('.js-job-parent').append(jobItem);

      var currentJobItem = $('.js-job-parent').find('.js-copy-block');
      $(currentJobItem[currentJobItem.length - 1]).find('.mdc-select').each(function(ind, el) {
        mdc.select.MDCSelect.attachTo(el);
      });

      $(currentJobItem[currentJobItem.length - 1]).find('.mdc-text-field').each(function(ind, el) {
        mdc.textField.MDCTextField.attachTo(el);
      });

    })
  }

  copyForm();


  $(document).on("click", ".side-menu .mdc-menu a", function (e) {
  
    $(".side-menu .mdc-menu .mdc-list-item").removeClass("active");
    $(this).parent().addClass("active");
  });
  



  function getTemplate(id_selector, context) {
    var source = document.getElementById(id_selector).innerHTML;
    var template = Handlebars.compile(source);
    return template(context);
  }

  $(document).on("click", ".js-info-pages-nav a", function (e) {
  	e.preventDefault();
    $(this).closest(".info-pages-nav").find("a").removeClass("active");
    $(this).addClass("active");
    var scroll_el = $(this).attr('href');
      if ($(scroll_el).length != 0) { 
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 20 }, 500); 
      }
      return false; 
  });

  function inputMask() {
    if ($('.js-phone-mask').length) {
      $(".js-phone-mask").mask("+1(999)-999-9999");
    }
  }

  inputMask();

  function messageDB() {
    $(document).on("click", ".message-db .mdc-button", function (e) {
      e.preventDefault();
      $(this).closest(".message-db").removeClass("show");
    });
  }

  messageDB();

  function skills() {
    $(document).mouseup(function (e){ // событие клика по веб-документу
      var div = $(".skills-search-result"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.removeClass("show"); // скрываем его
      }
    });
  }
  skills();

  function showSlide() {
    $(document).on("click", ".js-switch-agency-commission-slide .mdc-list-item", function (e) {
      if ($(this).hasClass("js-show-slide-agency-commission")) {
        $("#agency-commission-slide").addClass("show");
      } else {
        $("#agency-commission-slide").removeClass("show");
      }
    });
  }
  showSlide();

  function showSendFile() {
    $(document).on("click", ".js-switch-career-level .mdc-list-item", function (e) {
      if ($(this).hasClass("js-show-send-file")) {
        $("#send-file").addClass("show");
      } else {
        $("#send-file").removeClass("show");
      }
      
    });
  }
  showSendFile();

  function showSkills() {
    $(document).on("click", ".js-switch-skills .mdc-list-item", function (e) {
      $("#skills").addClass("show");
    });
  }
  
  showSkills();

  function showClipped() {
    $(document).on("click", ".js-show-more", function (e) {
      e.preventDefault();
      $(this).parent().find(".profile-form-desc-clipped").removeClass("profile-form-desc-clipped");
      $(this).hide();
    });
  }
  showClipped();

  function userMenu() {
    $(document)
      .on("mouseenter", ".js-user-menu", function (e) {
        $(this).find(".head-profile-menu").addClass("show");
      })
      .on("click", ".js-user-menu .side-menu__head-profile", function (e) {
        e.preventDefault();
      })
      .on("click", ".js-user-menu", function (e) {
        $(this).find(".head-profile-menu").addClass("show");
      })
      .on("mouseleave", ".head-profile-menu.show", function (e) {
        $(this).removeClass("show");
      })
      .on("mouseup", function (e){
        var div = $(".head-profile-menu");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          $(".head-profile-menu").removeClass("show");
        }
      });
  }

  userMenu();

  function RecruitmentSlider() {
    if($('.js-recruitment-slider').length) {
      $('.js-recruitment-slider').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          }
        },
        ]
      });
    }
  }
  RecruitmentSlider();

  function RecruitmentContentSlider() {
    if($('.js-recruitment-content-slider').length) {
      $('.js-recruitment-content-slider').slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
          }
        },
        ]
      });
    }
  }
  RecruitmentContentSlider();



  function calc() {
    $('.js-calc-input').change(function() {

      var val = $(this).val();
      var valMax = Number($(this).attr("max"));
      var valMin = Number($(this).attr("min"));
      var multiplier =  Number($(this).parent().parent().find('.js-calc-multiplier').text());

      if (val != "") {

        if (val > valMax) {
          val = valMax;
          $(this).val(valMax);
        } else if (val < valMin) {
          val = valMin;
          $(this).val(valMin);
        }
        
        val = val * multiplier;
        val = val+"$";

      } else {
        val = "-";
      }

      $(this).parent().parent().find('.js-calc-output').text("").text(val);
    })
  }
  calc();

  $(".contact-form").submit(function(e) {
    e.preventDefault();
    var self = $(this);
    var data = self.serialize()

    sendData('/api/url', data)
      .done(function() {
        window.location.href = 'request-an-invaite.html';
      })
      .fail(function() {
        console.log( "error" );
      });
      // .always(function() {
        // window.location.href = 'request-an-invaite.html';
      // });
  });

  function sendData(url, body) {
    return $.post(url, body);
  }

  var counterObserver = new IntersectionObserver( handleIntersection, {threshold: 1.0} );
  var counters = document.querySelectorAll('.counter');

  counters.forEach(function(el, ind) {
    counterObserver.observe(el);
  });

  function handleIntersection(entries, observer){
    entries.forEach(function(entry) {
      if (entry.intersectionRatio > 0) {
        updateCount(entry.target)
        observer.unobserve(entry.target);
      }
    });
  }

  function updateCount(el) {
    var max = parseInt($(el).attr("data-max"));
    $(el).animate({
      counter: max,
    }, {
      duration: 3000,
      easing: 'linear',
      step: function(now) {
        $(this).text(Math.ceil(now));
      },
    });
  };
});
