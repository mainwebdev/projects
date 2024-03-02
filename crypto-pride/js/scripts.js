$('.reviews').slick({
  centerMode: true,
  centerPadding: '50px',
  slidesToShow: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


/*  Анимации открывания/закрывания страниц  */

$(".nav-list__link").click(function(e) {
  e.preventDefault();

  let page = $(this).attr("data-page");
  
  $(".inner-page").addClass("is-visible " + page);

  $("." + page + "-nav").addClass("active");

  $(".close, .close-mob").click(function() {
    $(".inner-page").attr("class", "inner-page");
    $(".inner-nav-list__link").removeClass("active");
  });



  $(".inner-nav-list__link").click(function() {
    $(".nav-block").removeClass("open");

    let curPage = $(this).attr("data-page");

    $(".reset").addClass("is-visible");

    setTimeout(function() {
    
      $(".inner-page").attr("class", "inner-page");
     
      $(".inner-nav-list__link").removeClass("active");
    
    }, 100);

    
    setTimeout(function() {

      $(".inner-page").addClass("is-visible " + curPage);

      $("." + curPage + "-nav").addClass("active");
    
    }, 200);


    setTimeout(function() {
      
      $(".reset").removeClass("is-visible");
    
    }, 1000);

  });

});

/*   :hover для iphone   */

$(".nav-list__item").hover(function() {
  $(this).toggleClass("hover");
});


/*   Открытие/закрытие мобильного меню навигации   */

$(".humburger").click(function() {
  $(".nav-block").addClass("open");
});

/*   Смена класса у крестика закрытия и у большой буквы-заголовке в моб версии   */

if ($(window).outerWidth() < "768") {
  $(".close").addClass("close__mob-nav").removeClass("close");
  $(".logo-block__letter").addClass("close-mob");
}


/*   Закрытие мобильного меню-навигации   */

$(".close__mob-nav").click(function() {
  $(".nav-block").removeClass("open");
});