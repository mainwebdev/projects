$(document).ready(function () {
    $('.slider_goods').slick({
        slidesToScroll: 3,
        slidesToShow: 3,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        // responsive: [
        //   {
        //     breakpoint: 767,
        //     settings: {
        //       slidesToScroll: 1,
        //       slidesToShow: 1,
        //     }
        //   }
        // ]

    });


// animation script START

  var curPage = 1;
  var numOfPages = $('.main_block').length;
  var animTime = 2000;
  var scrolling = false;
  var pgPrefix = '.main_block-';

  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage)
      .removeClass('inactive')
      .addClass('active');
    $(pgPrefix + (curPage - 1)).addClass('inactive');
    $(pgPrefix + (curPage + 1)).removeClass('active');

    curPage == 1 && incrVideo()
    curPage == 2 && incrVideo2()
    curPage == 3 && decrVideo()

    setTimeout(function() {
      scrolling = false;
    }, animTime);
    if($('.main_block-2').hasClass('active')){
      $('.video_content').addClass('video_content_custom');     
    }
    else{
      $('.video_content').removeClass('video_content_custom');      
    }
  }

  function navigateUp() {
    if (curPage === 1) return;
    curPage--;
    pagination();
  }

  function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;    
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

  var initialPoint;
  var finalPoint;
    document.addEventListener('touchstart', function(event) {
    event.stopPropagation();
    initialPoint=event.changedTouches[0];
  }, false);
  document.addEventListener('touchend', function(event) {
    event.stopPropagation();
    finalPoint=event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);

    if (xAbs > 10) {

      if (finalPoint.pageY < initialPoint.pageY){
        navigateDown();
      }else{
        navigateUp();
      }
      
    }
  }, false);


  

// animation script END


// animation from .header_menu START

  $(".header_menu a").click(function(e) {
    e.preventDefault();

    var targetBlock = $(this).attr("data-block");

    $(".main_block")
      .removeClass("active")
      .removeClass("inactive");

    $(pgPrefix + targetBlock).addClass("active");

    if (targetBlock == numOfPages) {
      curPage = targetBlock - 1;
    } else {
      curPage = targetBlock;
    }
  });

});

// Анимация с видео
var s = Snap("#video");

var player =  s.image('video/waterfall.gif', -800, 0, 1600, 900);
var playerGroup = s.group(player)

var bottleSmallCode = "M288.76063,304.22141q.64815,72.18894,1.23793,144.38437c.12315,14.96539-7.66739,26.19749-21.80964,31.25291-11.47841,4.10269-23.47534,5.67764-35.563,6.31929-16.48848.875-32.97047.7-48.95341-4.0962-5.43135-1.63331-10.53863-4.36841-15.72368-6.75353-4.97117-2.28144-7.59611-6.38408-8.19239-11.73117-1.23145-11.0766-2.50827-22.14666-3.49343-33.24268-3.41566-38.60923-6.3517-77.29624-6.261-116.048.07778-32.16031,1.71755-64.34006,3.38973-96.48092,1.41941-27.22155,3.84991-54.4431,5.87856-81.66464.55739-7.46649,3.68138-13.50707,10.00067-17.869a130.24219,130.24219,0,0,0,13.90891-10.54511c6.06-5.54153,6.7665-11.8997,3.07863-19.27545-6.68873-13.40337-13.61078-26.69008-19.86525-40.30733-2.70271-5.898-3.88879-12.48951-5.76837-18.76343a8.30707,8.30707,0,0,1,2.47587-8.834,66.485,66.485,0,0,1,7.84888-6.64335C178.92819,8.39451,187.23724,3.44926,196.512.31231a3.78419,3.78419,0,0,1,4.44619,1.01756C210.95887,11.525,220.791,21.84973,228.45844,34.02165c4.161,6.61095,8.51,13.09875,12.8006,19.63193a15.27645,15.27645,0,0,0,1.9444,2.437c25.01141,24.77161,38.46664,54.98753,42.12858,89.74685,3.20178,30.09926,2.73512,60.33461,2.949,90.53757.16852,22.60685.03239,45.2137.03239,67.82055Z";
var bottleBigCode = "M436.11,956.06q2,226.89,3.89,453.79c.39,47-24.1,82.35-68.54,98.23-36.09,12.9-73.78,17.85-111.77,19.87-51.82,2.75-103.64,2.18-153.87-12.89-17.06-5.12-33.11-13.73-49.41-21.21-15.63-7.18-23.89-20.07-25.75-36.88-3.87-34.8-7.88-69.6-11-104.48C8.94,1231.14-.28,1109.56,0,987.76.24,886.67,5.4,785.53,10.66,684.54,15.11,598.9,22.75,513.43,29.13,427.9c1.75-23.48,11.57-42.44,31.42-56.17,15-10.39,30.28-20.84,43.73-33.13,19-17.41,21.26-37.41,9.68-60.59-21-42.12-42.86-83.88-62.45-126.67C43,132.8,39.3,112.09,33.39,92.37c-3.27-10.91,0-20.28,7.79-27.77S57,49.83,65.85,43.71C90.91,26.33,117,10.79,146.18,1c5.75-1.93,9.77-1.08,14,3.19,31.44,32.05,62.33,64.51,86.42,102.76,13.09,20.77,26.77,41.17,40.25,61.69a47.9,47.9,0,0,0,6.06,7.67c78.62,77.85,120.89,172.82,132.51,282.06C435.46,553,434,648,434.67,742.91c.52,71.05.1,142.1.1,213.15Z";

var image = s.image('video/bottle.png', 0, -1, 440, 1530);
var imageGroup = s.group(image)
imageGroup.attr({
  opacity: 0
});

var bottle = s.path(bottleBigCode)
var bottleGroup = s.group(bottle)
bottleGroup.attr({
  fill: "#fff"
});

playerGroup.attr({
  mask: bottleGroup
});

var mtrx = new Snap.Matrix()

function incrVideo() {
  bottle.animate({ d: bottleBigCode  }, 750);
  image.animate({ x: 0, width: 440, height: 1530  }, 750);
  imageGroup.animate({ opacity: 0 }, 750);
}

function incrVideo2() {
  bottle.animate({ d: bottleSmallCode  }, 750);
  image.animate({ x: 149, width: 142, height: 489 }, 750);
  imageGroup.animate({ opacity: 0 }, 750);
}

function decrVideo() {
  bottle.animate({ d: bottleSmallCode  }, 750);
  image.animate({ x: 149, width: 142, height: 489 }, 750);
  imageGroup.animate({ opacity: 1 }, 750);
}




$(document).ready(function () {
  $('.bottle6 li').hover(function () {
    $('.bottle6 .active_menu').removeClass('active_menu');
    $(this).addClass('active_menu');
    var paneltoshow = $(this).attr('data-name');
    $('.tab.active_tab').fadeIn('100', function () {
      $(this).removeClass('active_tab');
      $('#' + paneltoshow).delay('100').fadeOut(function () {
        $(this).addClass('active_tab');
      });
    });
  });
});