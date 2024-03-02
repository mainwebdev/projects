Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})
var scrollBarObj;
$( document ).ready(function() {
	$(".main-screen__slider").slick({
		dots: true,
		arrows: false,
		autoplay: true,
		speed: 1000
	});

	if ($(".section-8__mob").length) {
		$(".section-8__slider").slick({
			dots: false,
			arrows: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			centerMode: true,
			centerPadding: '50px',
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						swipeToSlide: true,
						centerPadding: '90px'
					}
				},
				{
					breakpoint: 420,
					settings: {
						slidesToShow: 1,
						swipeToSlide: true,
						centerPadding: '70px'
					}
				},
				{
					breakpoint: 350,
					settings: {
						slidesToShow: 1,
						swipeToSlide: true,
						centerPadding: '60px'
					}
				}
			]
		});
	}

	$(".section-11__slider").slick({
		dots: false,
		arrows: true,
		speed: 1000
	});

	$(".section-4__products").slick({
		slidesToShow: 5,
		arrows: false,
        dots: false,
        infinite: true,
        centerMode: false,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 0,
        cssEase: 'linear',
        draggable: false,
        focusOnSelect: false,
        pauseOnHover: false,
        responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 4
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 3
		      }
		    }
		]
	});


	$(".nav-link-shop").click(function() {
		$(this).toggleClass("active");
		
		if (!$(".section-1").hasClass("inactive") && $(".nav-link-shop").hasClass("active")) $(".header").addClass("active");
		else if(!$(".section-1").hasClass("inactive")) $(".header").removeClass("active");


		$(".header__menu").delay(200).slideToggle(400);
	});


	$(".mob-menu__search--title").click(function() {
		$(".mob-menu__search").addClass("active");
	});


	$(".humburger").click(function() {
		$(".header, .humburger, .mob-menu").toggleClass("active");
		$(".mob-menu__search").removeClass("active");
	});

	$(".to-submenu").click(function(e) {
		e.preventDefault();
		$(this).parent().find(".mob-menu__sublist").addClass("active");
	});

	$(".mob-menu__sublist--close").click(function(e) {
		e.preventDefault();
		$(this).parent().parent().removeClass("active");
	});


	// animation

	if ($(window).width() > '840') {
		$(".header").click(function(e){
			e.stopPropagation();
		});
		$('html').click(function() {
			$(".nav-link-shop").removeClass("active");
			if(!$(".section-1").hasClass("inactive")) $(".header").removeClass("active");
			$(".header__menu").delay(200).slideUp(400);
		});



	    var curPage = 1;
	    var numOfPages = $('.section').length;
	    var animTime = 1500;
	    var scrolling = false;
	    var pgPrefix = '.section-';

	    function pagination() {
	      scrolling = true;

	      $(pgPrefix + curPage)
	        .removeClass('inactive')
	        .addClass('active');
	      $(pgPrefix + (curPage - 1)).addClass('inactive');
	      $(pgPrefix + (curPage + 1)).removeClass('active');

	      setTimeout(function() {
	        scrolling = false;
	      }, animTime);
	    }

	    function navigateUp() {
			if ($(".section-8").hasClass("active") && scrollBarObj.axis.y.scrollbar.rect.top != 0 && !$(".section-9").hasClass("active")) return;	

			if (curPage === 1) return;
			curPage--;

			
			$(".header").removeClass("disabled").addClass("active");

		    
		    if(!$(".nav-link-shop").hasClass("active") && curPage === 1) $(".header").removeClass("active");

			if(curPage === 5) document.querySelector(".section-5__img video").play();
			else document.querySelector(".section-5__img video").pause();

			if(curPage === 6) document.querySelector(".section-6__img video").play();
			else document.querySelector(".section-6__img video").pause();

			pagination();	
	    }

	    function navigateDown() {
	    	// if ($(".section-8").hasClass("active") && !(Math.floor(scrollBarObj.axis.y.track.rect.height) <=  scrollBarObj.axis.y.scrollbar.rect.bottom) && !$(".section-9").hasClass("active")) {
	    	// 	console.log("blocked");
	    	// 	return;
	    	// }
			if (curPage === numOfPages) return;
			curPage++;

	        $(".header").addClass("disabled");

	        if(curPage === 5) document.querySelector(".section-5__img video").play();
			else document.querySelector(".section-5__img video").pause();

			if(curPage === 6) document.querySelector(".section-6__img video").play();
			else document.querySelector(".section-6__img video").pause();

			pagination();
	    }

	    $(document).on('mousewheel DOMMouseScroll', function(e) {
	      if (scrolling) return;
	      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
	        navigateUp();
	        
	      } else {
	        navigateDown();
	      }

		      
	    });

	    $(document).on('keydown', function(e) {
	      if (scrolling) return;
	      if (e.which === 38) {
	        navigateUp();
	      } else if (e.which === 40) {
	        navigateDown();
	      }
	    });
    }
    else {
    	document.querySelector(".section-5__img video").play();
    	document.querySelector(".section-6__img video").play();
    	
    }
    scrollBarObj = new SimpleBar(document.querySelector('.section-8'));

    // footer accrdion

    var title,
    	titleList;

    if ($(window).width() < 576) {
    	title = $(".footer__title");
    	titleList = $(".footer__list");
    } else {
    	title = $(".footer .row:nth-child(2) .footer__title");
    	titleList = $(".footer .row:nth-child(2) .footer__list");
    }

    


		 $(title).on("click", function() {
		    if ($(this).hasClass("active")) {
		      $(this).removeClass("active");
		      $(this)
		        .siblings(titleList)
		        .slideUp(200);
		      $(".footer__title--plus")
		        .removeClass("minus");
		    } else {
		      $(".footer__title--plus")
		        .removeClass("minus");
		      $(this)
		        .find(".footer__title--plus")
		        .addClass("minus");
		      $(title).removeClass("active");
		      $(this).addClass("active");
		      $(titleList).slideUp(200);
		      $(this)
		        .siblings(titleList)
		        .slideDown(200);
	    	}
	  	});
	


});