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
  hidePreloader();
  initWidgets();
  setPageHeight(opts);
  projectMasonary();
  setEffects();
  typerFunctionality();
  callFancyListener();
}

function callFancyListener() {
  $(document).on('click', '.js-call-fancy', function(e) {
    var id = $(this).attr('href') || $(this).attr('data-href');
    if(id) showFancy(id);
  });
}

/**
 *interface for call modal by id, like as "#modalId"
 * @param modalId: String (example: "#modalId")
 */
function showFancy(modalId) {
  if($(modalId).length) {
    // for modals at mobile, remove padding on mobile
    var slideClass = $(modalId).attr('data-slide-class');
    $.fancybox.open({
      src: modalId,
      type: 'inline',
      slideClass: slideClass ? slideClass : '',
      touch: slideClass ? false : true, // for work select inside modal
      btnTpl: {
        smallBtn:
          '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">'
        +   '<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.35355" y1="0.646447" x2="20.3536" y2="19.6464" /><line y1="-0.5" x2="26.8701" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1.61279)" /></svg>'
        + '</button>'
      },
    });
  }
}

function hidePreloader() {
  var preloader = $('#preloader');
  var preloaderInstance = preloader[0].instance;
  var aniamtions = runAniamtions();

  if (preloader.length && preloaderInstance) {
    preloaderInstance.pageLoad();
    preloader.on('animationend', function (e) {
      if ($(e.target).is($(this))) {
        aniamtions.play();
      }
    });
  } else {
    // if not preloader
    aniamtions.play();
  }
}

function runAniamtions() {
  var tl = gsap.timeline({ paused: true });
  var projects = $('.projects');
  var heroBottom = $('.hero__text-bottom');
  var title = $('.hero__text-top h1 .letter');
  var btns = $('.anim-btns');

  tl.fromTo(title, { opacity: 0, top: 50 }, { opacity: 1, top: 0, duration: 1.5, stagger: 0.05 })
    .fromTo(heroBottom, { opacity: 0, top: 100 }, { opacity: 1, top: 0, duration: 1.5 }, '-=1.5')
    .fromTo(projects, { opacity: 0, top: 100 }, { opacity: 1, top: 0, duration: 1.5 }, '-=1')
    .fromTo(btns, { opacity: 0 }, { opacity: 1, duration: 2 });

  return tl;
}

function initWidgets() {
  var filter = new JFilter();
  var mobmenu = new JMobMenu();
  var widgets = [filter, mobmenu];
  filter.addWidgets(widgets);
  mobmenu.addWidgets(widgets);
}

function JFilter() {
  // exdends Widget
  Widget.call(this);
  JFilter.prototype = Object.create(Widget.prototype);
  JFilter.prototype.constructor = JFilter;

  var $body = $('body');
  var $header = $('#header');
  var $window = $(window);
  var self = this;

  this.elem = $('#project-filter');
  this.openBtns = $('.all-project');
  this.closeBtns = $('.js-all-project-close');
  this.showBtnAtHeader = false;
  this.open = function (e) {
    e && e.preventDefault();
    !self.isOpen && _openEffects();
  };

  this.close = function (e) {
    e && e.preventDefault();
    self.isOpen && _closeEffects();
  };

  this.toggle = function (e) {
    e && e.preventDefault();
    self.isOpen ? _closeEffects() : _openEffects();
  };

  // listeners
  this.openBtns.click(self.toggle);
  this.closeBtns.click(self.close);
  $window.scroll(function (e) {
    var top = $(this).scrollTop();
    var projectsBlock = $('.projects').offset().top;
    self.showBtnAtHeader = top > projectsBlock;
    self.showBtnAtHeader ? $header.addClass('show-all-project') : $header.removeClass('show-all-project');
  });

  function _openEffects() {
    self.closeIfSomeOpen(JFilter);

    var bar = getScrollbarWidth();
    $body.css({ overflow: 'hidden', paddingRight: bar + 'px' });
    $header
      .addClass('show-all-project')
      .addClass('filter-open').css({ paddingRight: bar + 'px' });
    self.elem.addClass('active');
    self.openBtns.addClass('active');
    self.isOpen = true;
  }

  function _closeEffects() {
    $body.css({ overflow: '', paddingRight: '' });
    $header.removeClass('filter-open').css({ paddingRight: '' });
    !self.showBtnAtHeader && $header.removeClass('show-all-project');
    self.elem.removeClass('active');
    self.openBtns.removeClass('active');
    self.isOpen = false;
  }
}

function JMobMenu() {
  // exdends Widget
  Widget.call(this);
  JMobMenu.prototype = Object.create(Widget.prototype);
  JMobMenu.prototype.constructor = JMobMenu;

  var body = $('body');
  var header = $('#header');
  var self = this;
  this.elem = $('#mob-menu');
  this.toggleBtn = $('.mob-burger');

  this.open = function (e) {
    e && e.preventDefault();
    !self.isOpen && _openEffects();
  };

  this.close = function (e) {
    e && e.preventDefault();
    self.isOpen && _closeEffects();
  };

  this.toggle = function (e) {
    e && e.preventDefault();
    self.isOpen ? _closeEffects() : _openEffects();
  };

  // listeners
  this.toggleBtn.click(self.toggle);

  function _openEffects() {
    self.closeIfSomeOpen(JMobMenu);

    var bar = getScrollbarWidth();
    body.css({ overflow: 'hidden', paddingRight: bar + 'px' });
    header.attr('data-show-menu', true).css({ paddingRight: bar + 'px' });
    self.toggleBtn.addClass('active');
    self.isOpen = true;
  }

  function _closeEffects() {
    body.css({ overflow: '', paddingRight: '' });
    header.attr('data-show-menu', false).css({ paddingRight: '' });
    self.toggleBtn.removeClass('active');
    self.isOpen = false;
  }
}

function Widget() {
  var self = this;
  this.isOpen = false;
  this.widgets = [];

  this.isOpenCheck = function () {
    return this.isOpen;
  };

  this.addWidgets = function (widgets) {
    widgets.forEach(function (w) {
      self.widgets.push(w);
    });
  };

  this.closeIfSomeOpen = function (widgetsInstance) {
    this.widgets.length > 0 &&
      this.widgets.forEach(function (w) {
        if (!(w instanceof widgetsInstance)) {
          var status = w.isOpenCheck && w.isOpenCheck();
          status && w.close();
        }
      });
  };
}

function projectMasonary() {
  var $projects = $('#projects');
  var projectsGrid = $projects.find('.grid');
  var projectsGridMasonary = null;
  var showBtn = $('.projects__more');

  if (
    typeof $.prototype.imagesLoaded === 'function' &&
    typeof $.prototype.masonry === 'function' &&
    $projects.length &&
    projectsGrid.length
  ) {
    $projects.imagesLoaded().always(function (instance) {
      projectsGridMasonary = projectsGrid.masonry();
    });

    showBtn.click(function(e) {
      e && e.preventDefault();

      $.get('./data.json')
        .done(function(data) {
          var projects = data.result.projects;
          var items = projects.map(function(p) {
            return projectTemplate(p)[0];
          });

          items = $(items);

          projectsGridMasonary.append(items)
            .masonry('appended', items, true)

          $projects.imagesLoaded().always(function (instance) {
            projectsGridMasonary.masonry();
          });
        })
    });
  }
}

function projectTemplate(data) {
  var t = $($("#project-template").html());
  t.find('[data-link]').attr('href', data.link);
  t.find('[data-image]').attr('src', data.image);
  t.find('[data-title]').text(data.title);
  t.find('[data-type]').text(data.type);
  return t;
}

function setEffects() {
  // var $body = $('body');
  // var $header = $('#header');
  // var $window = $(window);
  var $projectsFilterItems = $('.project-filter-item input[name="project-filter-item"]');
  var $projectsFilterOpenBtns = $('.all-project');

  $projectsFilterItems.change(function () {
    var self = $(this);
    $projectsFilterOpenBtns.text(self.val());
  });

  // distort effect on btn
  new LinkFx1($('.all-project-close')[0]);
  new LinkFx1($('.anim-btn--left .anim-btn__content')[0]);
  new LinkFx1($('.anim-btn--right .anim-btn__content')[0]);

  $('[data-smooth-bar]').each(function (_, b) {
    Scrollbar.init(b);
  });
}

function setPageHeight(opts) {
  pageHeight();
  window.addEventListener(
    'resize',
    function () {
      pageHeight();
    },
    opts.supportsPassive ? { passive: true } : false
  );

  window.addEventListener(
    'scroll',
    function () {
      pageHeight();
    },
    opts.supportsPassive ? { passive: true } : false
  );

  function pageHeight() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
}

function getScrollbarWidth() {
  if (getDocHeight() > window.innerHeight) {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  } else {
    return 0;
  }
}

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

var TxtType = (function () {
  function TxtType(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }

  var _proto = TxtType.prototype;

  _proto.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="typewrite-wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  return TxtType;
})();

function typerFunctionality() {
  var typeElem = document.getElementById('typewrite-1');
  if (typeElem) {
    var toRotate = typeElem.getAttribute('data-type');
    var period = typeElem.getAttribute('data-period');
    if (toRotate) {
      new TxtType(typeElem, JSON.parse(toRotate), period);
    }
  }
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var LinkFx = (function () {
  function LinkFx(el) {
    this.DOM = {
      el: el,
    };
    this.options = {
      animation: {
        text: false,
        line: true,
      },
    };
    this.DOM.el.innerHTML = '';
    this.DOM.line = document.createElement('span');
    this.DOM.line.classList = 'menu__link-deco';
    this.DOM.el.appendChild(this.DOM.line);
    this.DOM.el.dataset.text != undefined &&
      (this.options.animation.text = this.DOM.el.dataset.text === 'false' ? false : true);
    this.DOM.el.dataset.line != undefined &&
      (this.options.animation.line = this.DOM.el.dataset.line === 'false' ? false : true);
    this.initEvents();
  }

  var _proto2 = LinkFx.prototype;

  _proto2.initEvents = function initEvents() {
    var _this = this;

    this.onMouseEnterFn = function () {
      return _this.tl.restart();
    };

    this.onMouseLeaveFn = function () {
      return _this.tl.progress(1).kill();
    };

    this.DOM.el.addEventListener('mouseenter', this.onMouseEnterFn);
    this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveFn);
  };

  _proto2.createTimeline = function createTimeline() {
    var _this2 = this;

    // init timeline
    this.tl = gsap.timeline({
      paused: true,
      onStart: function onStart() {
        if (_this2.options.animation.line) {
          _this2.DOM.line.style.filter = 'url(' + _this2.filterId;
        }

        if (_this2.options.animation.text) {
          _this2.DOM.text.style.filter = 'url(' + _this2.filterId;
        }
      },
      onComplete: function onComplete() {
        if (_this2.options.animation.line) {
          _this2.DOM.line.style.filter = 'none';
        }

        if (_this2.options.animation.text) {
          _this2.DOM.text.style.filter = 'none';
        }
      },
    });
  };

  return LinkFx;
})();

var LinkFx1 = (function (_LinkFx) {
  _inheritsLoose(LinkFx1, _LinkFx);

  function LinkFx1(el) {
    var _this3;

    _this3 = _LinkFx.call(this, el) || this;
    _this3.filterId = '#filter-1';
    _this3.DOM.feTurbulence = document.querySelector(_this3.filterId + ' > feTurbulence');
    _this3.primitiveValues = {
      turbulence: 0,
    };

    _this3.createTimeline();

    _this3.tl.eventCallback('onUpdate', function () {
      return _this3.DOM.feTurbulence.setAttribute('baseFrequency', _this3.primitiveValues.turbulence);
    });

    _this3.tl.to(_this3.primitiveValues, {
      duration: 0.4,
      //ease: "Quint.easeOut",
      startAt: {
        turbulence: 0.09,
      },
      turbulence: 0,
    });

    return _this3;
  }

  return LinkFx1;
})(LinkFx);
