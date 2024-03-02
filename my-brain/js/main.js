$(document).ready(function() {
  var isInstruction = $(".cover").hasClass("cover-is-instruction");

  (function fancyboxInit() {
    $('[data-fancybox]').fancybox({
      btnTpl: {
      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn:
        '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.74 26.74"><title>close-popup</title><g id="Слой_2" data-name="Слой 2"><g id="Слой_1-2" data-name="Слой 1"><path d="M13.37,26.74A13.37,13.37,0,1,1,26.74,13.37,13.39,13.39,0,0,1,13.37,26.74ZM13.37,1A12.37,12.37,0,1,0,25.74,13.37,12.39,12.39,0,0,0,13.37,1Z"/><rect x="6.53" y="12.87" width="13.69" height="1" transform="translate(-5.54 13.37) rotate(-45)"/><rect x="12.87" y="6.53" width="1" height="13.69" transform="translate(-5.54 13.37) rotate(-45)"/></g></g></svg>' +
        "</button>"
      },
    });
  })()



  function animateCSS(element, animationName, callback) {
    var node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }


  (function animFirstContent() {
    $(".js-anim-el-logo").removeClass("hide");
    animateCSS('.js-anim-el-logo', 'fadeIn', function() {
      $(".js-anim-el-1").removeClass("hide");
      animateCSS('.js-anim-el-1', 'fadeIn', function() {
        $(".js-anim-el-2").removeClass("hide");
        animateCSS('.js-anim-el-2', 'fadeIn', function() {
          $(".js-anim-el-rights").removeClass("hide");
          animateCSS('.js-anim-el-rights', 'fadeIn');
        });
      });
    });
  })()

  $(".js-go-btn").click(function(e) {
    e.preventDefault();
    $(this).closest(".cover").removeClass("cover-is-instruction");
    isInstruction = $(".cover").hasClass("cover-is-instruction");
    animRemoveFirstContent();
    animNav();
  })

  function animRemoveFirstContent() {
    
    animateCSS('.js-anim-el-1', 'fadeOut', function() {
      $(".js-anim-el-1").addClass("hide");
    });

    animateCSS('.js-anim-el-2', 'fadeOut', function() {
      $(".js-anim-el-2").addClass("hide");
    });
  }

  function animNav() {
    $(".js-anim-el-nav").removeClass("hide");
    animateCSS('.js-anim-el-nav', 'fadeIn', function() {

      $(".js-anim-el-nav").addClass("show-anim");

      var navLength = $(".js-anim-el-nav li").length;
      var i = 1;

      (function animNavItem() {
        if (i <= navLength) {
          $(".js-anim-el-nav li:nth-child("+i+")").removeClass("hide");

          animateCSS('.js-anim-el-nav li:nth-child('+i+')', 'fadeInLeft', animNavItem);
          i++
        }
      })()

    });

  }


  $(".js-nav-item").click(function(e) {
    e.preventDefault();
    if ( !$(this).parent().hasClass("active")) {
      $(".js-anim-el-nav").removeClass("non-active");
      $(".js-anim-el-nav li").removeClass("active");
      $(this).parent().addClass("active");
      $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");

      $('.js-anim-el-pageHead-11, .js-anim-el-pageHead-12, .js-anim-el-pageHead-13').removeClass("top");

      if ($(this).hasClass("js-nav-1")) {
        showContentNav_1();
      } else if ($(this).hasClass("js-nav-2")) {
        showContentNav_2();
      } else if ($(this).hasClass("js-nav-3")) {
        showContentNav_3();
      }
    }
  });


  function showContentNav_1() {
    hideContentNav_2();
    hideContentNav_3();

    // костыль для перехода на главный экран, для остановка анимации
    if(!isInstruction) {
      animationLayersStop();
      $('.js-anim-el-instruction').removeClass("hide");
      animateCSS('.js-anim-el-instruction', 'fadeIn');

      $('.js-anim-el-pageHead-2').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-2', 'fadeIn', function() {

        if(!isInstruction) {
          $('[data-page-desc="1"]').removeClass("hide");
          animateCSS('[data-page-desc="1"]', 'fadeIn', function() {

            if(!isInstruction) {
              $('.js-anim-el-pageHead-3').addClass("bottom").removeClass("hide");
              animateCSS('.js-anim-el-pageHead-3', 'fadeIn', function() {

                if(!isInstruction) {
                  $('.js-anim-el-pageHead-11').removeClass("hide");
                  animateCSS('.js-anim-el-pageHead-11', 'fadeIn');
                }

              });
            }

          });
        }

      });

      $('.js-anim-el-levels-1').removeClass("hide");
      animateCSS('.js-anim-el-levels-1', 'fadeIn', function() {

        $('.js-anim-el-levels-1').removeClass("hide-line");
        layerSwitch(1);

      });
    }
  }

  function showContentNav_2() {
    hideContentNav_1();
    hideContentNav_3();

    // костыль для перехода на главный экран, для остановка анимации
    if(!isInstruction) {
      animationLayersStop();
      $('.js-anim-el-instruction').removeClass("hide");
      animateCSS('.js-anim-el-instruction', 'fadeIn');

      $('.js-anim-el-pageHead-5').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-5', 'fadeIn', function() {

        if(!isInstruction) {
          $('[data-page-desc="3"]').removeClass("hide");
          animateCSS('[data-page-desc="3"]', 'fadeIn', function() {

            if(!isInstruction) {
              $('.js-anim-el-pageHead-6').addClass("bottom").removeClass("hide");
              animateCSS('.js-anim-el-pageHead-6', 'fadeIn', function() {

                if(!isInstruction) {
                  $('.js-anim-el-pageHead-12').removeClass("hide");
                  animateCSS('.js-anim-el-pageHead-12', 'fadeIn');
                }

              });
            }

          });
        }

      });

      $('.js-anim-el-levels-3').removeClass("hide");
      animateCSS('.js-anim-el-levels-3', 'fadeIn', function() {
        $('.js-anim-el-levels-3').removeClass("hide-line");
        layerSwitch(3);
      });
    }
  }

  function showContentNav_3() {
    hideContentNav_1();
    hideContentNav_2();

    // костыль для перехода на главный экран, для остановка анимации
    if(!isInstruction) {
      animationLayersStop();
      $('.js-anim-el-instruction').removeClass("hide");
      animateCSS('.js-anim-el-instruction', 'fadeIn');

      $('.js-anim-el-pageHead-8').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-8', 'fadeIn', function() {

        if(!isInstruction) {
          $('[data-page-desc="5"]').removeClass("hide");
          animateCSS('[data-page-desc="5"]', 'fadeIn', function() {

            if(!isInstruction) {
              $('.js-anim-el-pageHead-9').addClass("bottom").removeClass("hide");
              animateCSS('.js-anim-el-pageHead-9', 'fadeIn', function() {

                if(!isInstruction) {
                  $('.js-anim-el-pageHead-13').removeClass("hide");
                  animateCSS('.js-anim-el-pageHead-13', 'fadeIn');
                }

              });
            }

          });
        }

      });

      $('.js-anim-el-levels-5').removeClass("hide");
      animateCSS('.js-anim-el-levels-5', 'fadeIn', function() {
        $('.js-anim-el-levels-5').removeClass("hide-line");
        layerSwitch(5);
      });
    }
  }

  var animationLayersSwitchActive = [""];

  (function layerSwitchAddArray(){
    var animationLayersLength = $(".js-anim-el-levels").length;

    while (animationLayersLength) {
      animationLayersSwitchActive.push(false); 
      animationLayersLength--
    }
  })()

  function animationLayersStop() {

    $.each(animationLayersSwitchActive, function(i) {
      if (i > 0) {
        animationLayersSwitchActive[i] = false;
      }
    })

    $('.js-anim-el-levels').attr("data-level-active", "1");
  }

  function layerSwitch(layer) {
    animationLayersSwitchActive[layer] = true;

    var timer;
    var layers = $('.js-anim-el-levels-'+layer+'');
    var layerText = $('.page-desc-wrap[data-page-desc="'+layer+'"]');
    var countLayer = layers.find('[data-layer]').length

    var currentLayer = layers.attr("data-level-active");
    var dataLayer;

    setTimeout(function(){
      layers.find('.layers-line').addClass("none-transition-delay");
    }, 1500);


    layerToggle();

    function layerToggle() {

      clearTimeout(timer);

      if (!animationLayersSwitchActive[layer]) {
        return false;
      }

      if (countLayer >= currentLayer) {
        layers.attr("data-level-active", currentLayer);
        layerText.find('.page-desc').addClass('hide');
        layerText.find('.page-desc[data-layer-text='+currentLayer+']').removeClass('hide');
        timer = setTimeout(function(){
          currentLayer++;
          layerToggle();
        }, 2000);

      } else {
        currentLayer = 1;
        layers.attr("data-level-active", "1");
        layerText.find('.page-desc').addClass('hide');
        layerText.find('.page-desc[data-layer-text=1]').removeClass('hide');
        layerToggle();
      }
      
    }

    layers.find('.layer').click(function() {

      animationLayersSwitchActive[layer] = false;
      clearTimeout(timer);

      dataLayer = $(this).attr('data-layer');
      layers.attr("data-level-active", dataLayer);
      layerText.find('.page-desc').addClass('hide');
      layerText.find('.page-desc[data-layer-text='+dataLayer+']').removeClass('hide');
      currentLayer = layers.attr("data-level-active")

      // setTimeout(function(){
      //   animationLayersSwitchActive[layer] = true;
      //   layerToggle()
      // }, 3000)
    });

    layers.on("mouseenter", function() {
      animationLayersSwitchActive[layer] = false;
      clearTimeout(timer);
    }).on( "mouseleave", function() {
      animationLayersSwitchActive[layer] = true;
      layerToggle()
    });

    $(".page-desc-wrap").on("mouseenter", function() {
      animationLayersSwitchActive[layer] = false;
      clearTimeout(timer);
    }).on( "mouseleave", function() {
      animationLayersSwitchActive[layer] = true;
      layerToggle()
    });

  }


  $(".js-anim-el-pageHead-3").click(function(e) {
    animationLayersStop();

    $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");

    animateCSS('.js-anim-el-pageHead-2', 'fadeOut', function() {
      $('.js-anim-el-pageHead-2').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-11', 'fadeOut', function() {
      $('.js-anim-el-pageHead-11').addClass("hide top").removeClass("hide");
      animateCSS('.js-anim-el-pageHead-11', 'fadeIn')
    });

    animateCSS('.js-anim-el-pageHead-3', 'fadeOut', function() {
      $('.js-anim-el-pageHead-3').removeClass("bottom");
      $('.js-anim-el-pageHead-3 .hide').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-3', 'fadeIn', function(){
        $('.js-anim-el-pageHead-4').removeClass("hide");
        animateCSS('.js-anim-el-pageHead-4', 'fadeIn');
        $('.js-anim-el-scientific-2').removeClass("hide");
        animateCSS('.js-anim-el-scientific-2', 'fadeIn');
      });
		});

    animateCSS('[data-page-desc="1"]', 'fadeOut', function() {
      $('[data-page-desc="1"]').addClass("hide");
      $('[data-page-desc="2"]').removeClass("hide");
      animateCSS('[data-page-desc="2"]', 'fadeIn');
    });

    $('.js-anim-el-levels-1').addClass("hide-line");
    animateCSS('.js-anim-el-levels-1', 'fadeOut', function() {
      $('.js-anim-el-levels-1').addClass("hide");
      $('.js-anim-el-levels-2').removeClass("hide");
      animateCSS('.js-anim-el-levels-2', 'fadeIn', function() {
        $('.js-anim-el-levels-2').removeClass("hide-line");
        layerSwitch(2);
      });
    });

  });

  $(".js-anim-el-pageHead-6").click(function(e) {
    animationLayersStop();
    $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");

    animateCSS('.js-anim-el-pageHead-5', 'fadeOut', function() {
      $('.js-anim-el-pageHead-5').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-12', 'fadeOut', function() {
      $('.js-anim-el-pageHead-12').addClass("hide top").removeClass("hide");
      animateCSS('.js-anim-el-pageHead-12', 'fadeIn')
    });

    animateCSS('.js-anim-el-pageHead-6', 'fadeOut', function() {
      $('.js-anim-el-pageHead-6').removeClass("bottom");
      $('.js-anim-el-pageHead-6 .hide').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-6', 'fadeIn', function(){
        $('.js-anim-el-pageHead-7').removeClass("hide");
        animateCSS('.js-anim-el-pageHead-7', 'fadeIn');
        $('.js-anim-el-scientific-4').removeClass("hide");
        animateCSS('.js-anim-el-scientific-4', 'fadeIn');
      });
		});

    animateCSS('[data-page-desc="3"]', 'fadeOut', function() {
      $('[data-page-desc="3"]').addClass("hide");
      $('[data-page-desc="4"]').removeClass("hide");
      animateCSS('[data-page-desc="4"]', 'fadeIn');
    });

    $('.js-anim-el-levels-3').addClass("hide-line");
    animateCSS('.js-anim-el-levels-3', 'fadeOut', function() {
      $('.js-anim-el-levels-3').addClass("hide");
      $('.js-anim-el-levels-4').removeClass("hide");
      animateCSS('.js-anim-el-levels-4', 'fadeIn', function() {
        $('.js-anim-el-levels-4').removeClass("hide-line");
        layerSwitch(4);
      });
    });

  });

  $(".js-anim-el-pageHead-9").click(function(e) {
    animationLayersStop();
    $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");

    animateCSS('.js-anim-el-pageHead-8', 'fadeOut', function() {
      $('.js-anim-el-pageHead-8').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-13', 'fadeOut', function() {
      $('.js-anim-el-pageHead-13').addClass("hide top").removeClass("hide");
      animateCSS('.js-anim-el-pageHead-13', 'fadeIn');
    });

    animateCSS('.js-anim-el-pageHead-9', 'fadeOut', function() {
      $('.js-anim-el-pageHead-9').removeClass("bottom");
      $('.js-anim-el-pageHead-9 .hide').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-9', 'fadeIn', function(){
        $('.js-anim-el-pageHead-10').removeClass("hide");
        animateCSS('.js-anim-el-pageHead-10', 'fadeIn');
        $('.js-anim-el-scientific-6').removeClass("hide");
        animateCSS('.js-anim-el-scientific-6', 'fadeIn');
      });
		});

    animateCSS('[data-page-desc="5"]', 'fadeOut', function() {
      $('[data-page-desc="5"]').addClass("hide");
      $('[data-page-desc="6"]').removeClass("hide");
      animateCSS('[data-page-desc="6"]', 'fadeIn'); 
    });

    $('.js-anim-el-levels-5').addClass("hide-line");
    animateCSS('.js-anim-el-levels-5', 'fadeOut', function() {
      $('.js-anim-el-levels-5').addClass("hide");
      $('.js-anim-el-levels-6').removeClass("hide");
      animateCSS('.js-anim-el-levels-6', 'fadeIn', function() {
        $('.js-anim-el-levels-6').removeClass("hide-line");
        layerSwitch(6);
      });
    });

  });

  

  $(".js-anim-el-instruction").click(function(e) {
    e.preventDefault();

    $(this).closest(".cover").addClass("cover-is-instruction");
    isInstruction = $(".cover").hasClass("cover-is-instruction");

    animationLayersStop();

    $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");

    hideContent();
    seeInstruction();
  });

  function hideContent() {
    animateCSS('.js-anim-el-instruction', 'fadeOut', function() {
      $('.js-anim-el-instruction').addClass("hide");
    });

    animateCSS('.js-anim-el-nav', 'fadeOut', function() {
      $(".js-anim-el-nav").addClass("non-active");
      $(".js-anim-el-nav li").removeClass("active").addClass("hide");
      $(".js-anim-el-nav").addClass("hide");
    });

    hideContentNav_1();
    hideContentNav_2();
    hideContentNav_3();
  }

  function seeInstruction() {
    $(".js-anim-el-1").removeClass("hide");
    animateCSS('.js-anim-el-1', 'fadeIn', function() {
      $(".js-anim-el-2").removeClass("hide");
      animateCSS('.js-anim-el-2', 'fadeIn');
    });
  }

  $(".js-anim-el-pageHead-4").click(function(e) {
    animationLayersStop();
    nav_1_head4Back();
  });

  $(".js-anim-el-pageHead-7").click(function(e) {
    animationLayersStop();
    nav_2_head7Back();
  });

  $(".js-anim-el-pageHead-10").click(function(e) {
    animationLayersStop();
    nav_3_head10Back();
  });

  function nav_1_head4Back() {
    animateCSS('.js-anim-el-pageHead-11', 'fadeOut', function() {
      $('.js-anim-el-pageHead-11').addClass("hide").removeClass("top");

      
      animateCSS('.js-anim-el-pageHead-4', 'fadeOut', function() {
        $('.js-anim-el-pageHead-4').addClass("hide");
      });

      animateCSS('.js-anim-el-scientific-2', 'fadeOut', function() {
        $('.js-anim-el-scientific-2').addClass("hide");
      });

      animateCSS('.js-anim-el-pageHead-3', 'fadeOut', function() {
        $('.js-anim-el-pageHead-3').addClass("hide bottom");
        $('.js-anim-el-pageHead-3 span').addClass("hide");
        $('.js-anim-el-pageHead-2').removeClass("hide");
        animateCSS('.js-anim-el-pageHead-2', 'fadeIn');

        $('.js-anim-el-pageHead-3').removeClass("hide");
        animateCSS('.js-anim-el-pageHead-3', 'fadeIn', function() {
          $('.js-anim-el-pageHead-11').removeClass("hide");
          animateCSS('.js-anim-el-pageHead-11', 'fadeIn')
        });
      });
    });

    $('.js-anim-el-levels-2').addClass("hide-line");
    animateCSS('.js-anim-el-levels-2', 'fadeOut', function() {
      $('.js-anim-el-levels-2').addClass("hide");
      animationLayersStop()
      $('.js-anim-el-levels-1').removeClass("hide");
      animateCSS('.js-anim-el-levels-1', 'fadeIn', function() {
        $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");
        $('.js-anim-el-levels-1').removeClass("hide-line");
        layerSwitch(1);
      });
    });

    animateCSS('[data-page-desc="2"]', 'fadeOut', function() {
      $('[data-page-desc="2"]').addClass("hide");
      $('[data-page-desc="1"]').removeClass("hide");
      animateCSS('[data-page-desc="1"]', 'fadeIn');
    });
  }

  function nav_2_head7Back() {

    animateCSS('.js-anim-el-pageHead-12', 'fadeOut', function() {
      $('.js-anim-el-pageHead-12').addClass("hide").removeClass("top");
      
      animateCSS('.js-anim-el-pageHead-7', 'fadeOut', function() {
        $('.js-anim-el-pageHead-7').addClass("hide");
      });

      animateCSS('.js-anim-el-scientific-4', 'fadeOut', function() {
        $('.js-anim-el-scientific-4').addClass("hide");
      });

      animateCSS('.js-anim-el-pageHead-6', 'fadeOut', function() {
        $('.js-anim-el-pageHead-6').addClass("hide bottom");
        $('.js-anim-el-pageHead-6 span').addClass("hide");
      });

      $('.js-anim-el-pageHead-5').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-5', 'fadeIn', function() {
        
        animateCSS('.js-anim-el-pageHead-6', 'fadeIn', function() {
          $('.js-anim-el-pageHead-12').removeClass("hide");
          animateCSS('.js-anim-el-pageHead-12', 'fadeIn')
          $('.js-anim-el-pageHead-6').removeClass("hide");
          animateCSS('.js-anim-el-pageHead-6', 'fadeIn');
        });
      });
    });

    $('.js-anim-el-levels-4').addClass("hide-line");
    animateCSS('.js-anim-el-levels-4', 'fadeOut', function() {
      $('.js-anim-el-levels-4').addClass("hide");
      animationLayersStop()
      $('.js-anim-el-levels-3').removeClass("hide");
      animateCSS('.js-anim-el-levels-3', 'fadeIn', function() {
        $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");
        $('.js-anim-el-levels-3').removeClass("hide-line");
        layerSwitch(3);
      });
    });

    animateCSS('[data-page-desc="4"]', 'fadeOut', function() {
      $('[data-page-desc="4"]').addClass("hide");
      $('[data-page-desc="3"]').removeClass("hide");
      animateCSS('[data-page-desc="3"]', 'fadeIn');
    });
  }

  function nav_3_head10Back() {

    animateCSS('.js-anim-el-pageHead-13', 'fadeOut', function() {
      $('.js-anim-el-pageHead-13').addClass("hide").removeClass("top");
      
      animateCSS('.js-anim-el-pageHead-10', 'fadeOut', function() {
        $('.js-anim-el-pageHead-10').addClass("hide");
      });

      animateCSS('.js-anim-el-scientific-6', 'fadeOut', function() {
        $('.js-anim-el-scientific-6').addClass("hide");
      });

      animateCSS('.js-anim-el-pageHead-9', 'fadeOut', function() {
        $('.js-anim-el-pageHead-9').addClass("hide bottom");
        $('.js-anim-el-pageHead-9 span').addClass("hide");
      });

      $('.js-anim-el-pageHead-8').removeClass("hide");
      animateCSS('.js-anim-el-pageHead-8', 'fadeIn', function() {
        
        animateCSS('.js-anim-el-pageHead-9', 'fadeIn', function() {
          $('.js-anim-el-pageHead-13, .js-anim-el-pageHead-9').removeClass("hide");
          animateCSS('.js-anim-el-pageHead-13', 'fadeIn')
          animateCSS('.js-anim-el-pageHead-9', 'fadeIn');
        });
      });
    });

    $('.js-anim-el-levels-6').addClass("hide-line");
    animateCSS('.js-anim-el-levels-6', 'fadeOut', function() {
      $('.js-anim-el-levels-6').addClass("hide");
      animationLayersStop()
      $('.js-anim-el-levels-5').removeClass("hide");
      animateCSS('.js-anim-el-levels-5', 'fadeIn', function() {
        $('.js-anim-el-levels-5').removeClass("hide-line");
        $('.js-anim-el-levels .layers-line').removeClass("none-transition-delay");
        layerSwitch(5);
      });
    });

    animateCSS('[data-page-desc="6"]', 'fadeOut', function() {
      $('[data-page-desc="6"]').addClass("hide");
      $('[data-page-desc="5"]').removeClass("hide");
      animateCSS('[data-page-desc="5"]', 'fadeIn');
    });
  }


  function hideContentNav_1() {

    animateCSS('.js-anim-el-pageHead-2', 'fadeOut', function() {
      $('.js-anim-el-pageHead-2').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-3', 'fadeOut', function() {
      $('.js-anim-el-pageHead-3').addClass("hide bottom");
      $('.js-anim-el-pageHead-3 span').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-4', 'fadeOut', function() {
      $('.js-anim-el-pageHead-4').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-11', 'fadeOut', function() {
      $('.js-anim-el-pageHead-11').addClass("hide");
    });

    animateCSS('[data-page-desc="1"]', 'fadeOut', function() {
      $('[data-page-desc="1"]').addClass("hide");
    });

    animateCSS('[data-page-desc="2"]', 'fadeOut', function() {
      $('[data-page-desc="2"]').addClass("hide");
    });

    animateCSS('.js-anim-el-levels-1', 'fadeOut', function() {
      $('.js-anim-el-levels-1').addClass("hide-line hide");
    });

    animateCSS('.js-anim-el-levels-2', 'fadeOut', function() {
      $('.js-anim-el-levels-2').addClass("hide-line hide");
    });

    animateCSS('.js-anim-el-scientific-2', 'fadeOut', function() {
      $('.js-anim-el-scientific-2').addClass("hide");
    });
  }

  function hideContentNav_2() {

    animateCSS('.js-anim-el-pageHead-5', 'fadeOut', function() {
      $('.js-anim-el-pageHead-5').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-6', 'fadeOut', function() {
      $('.js-anim-el-pageHead-6').addClass("hide bottom");
      $('.js-anim-el-pageHead-6 span').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-7', 'fadeOut', function() {
      $('.js-anim-el-pageHead-7').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-12', 'fadeOut', function() {
      $('.js-anim-el-pageHead-12').addClass("hide");
    });

    animateCSS('[data-page-desc="3"]', 'fadeOut', function() {
      $('[data-page-desc="3"]').addClass("hide");
    });

    animateCSS('[data-page-desc="4"]', 'fadeOut', function() {
      $('[data-page-desc="4"]').addClass("hide");
    });

    animateCSS('.js-anim-el-levels-3', 'fadeOut', function() {
      $('.js-anim-el-levels-3').addClass("hide-line");
      $('.js-anim-el-levels-3').addClass("hide");
    });

    animateCSS('.js-anim-el-levels-4', 'fadeOut', function() {
      $('.js-anim-el-levels-4').addClass("hide-line");
      $('.js-anim-el-levels-4').addClass("hide");
    });

    animateCSS('.js-anim-el-scientific-4', 'fadeOut', function() {
      $('.js-anim-el-scientific-4').addClass("hide");
    });
  }

  function hideContentNav_3() {

    animateCSS('.js-anim-el-pageHead-8', 'fadeOut', function() {
      $('.js-anim-el-pageHead-8').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-9', 'fadeOut', function() {
      $('.js-anim-el-pageHead-9').addClass("hide bottom");
      $('.js-anim-el-pageHead-9 span').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-10', 'fadeOut', function() {
      $('.js-anim-el-pageHead-10').addClass("hide");
    });

    animateCSS('.js-anim-el-pageHead-13', 'fadeOut', function() {
      $('.js-anim-el-pageHead-13').addClass("hide");
    });

    animateCSS('[data-page-desc="5"]', 'fadeOut', function() {
      $('[data-page-desc="5"]').addClass("hide");
    });

    animateCSS('[data-page-desc="6"]', 'fadeOut', function() {
      $('[data-page-desc="6"]').addClass("hide");
    });

    animateCSS('.js-anim-el-levels-5', 'fadeOut', function() {
      $('.js-anim-el-levels-5').addClass("hide-line");
      $('.js-anim-el-levels-5').addClass("hide");
    });

    animateCSS('.js-anim-el-levels-6', 'fadeOut', function() {
      $('.js-anim-el-levels-6').addClass("hide-line");
      $('.js-anim-el-levels-6').addClass("hide");
    });

    animateCSS('.js-anim-el-scientific-6', 'fadeOut', function() {
      $('.js-anim-el-scientific-6').addClass("hide");
    });
  }

});