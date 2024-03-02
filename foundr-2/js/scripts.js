// nav scrolling and progress START

$('.nav__item a').click( function(){ 
var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) { 
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top+10 }, 500); 
    }
    return false; 
});


var menu_selector = ".nav"; 
var arrWrappersPositions = [];

function navigationStateUpdate(){
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a.nav__item--link").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).removeClass("progress");
            $(this).addClass("active");
        }
        else if(target.position().top + target.outerHeight() <= scroll_top && target.position().top <= scroll_top) {
            $(this).addClass("progress");
            $(this).removeClass("active");
        } else {
            $(this).removeClass("progress");
            $(this).removeClass("active");
        }
    });
}

$(document).ready(function(){
    navigationStateUpdate();
});

$(document).on("scroll", navigationStateUpdate);

// nav scrolling and progress END



// video play START

$(".video").click(function() {
    videoSrc=$(this).attr("data-video-src");
    $(this).addClass("active").find("iframe").attr("src", videoSrc);
});

// video play END



// progress line START

$(function() {
     $(window).on("scroll resize", function() {
         var o = $(window).scrollTop() / ($(document).height() - $(window).height());
         $(".progress-bar").css({
             "width": (100 * o | 0) + "%"
         });
         $('progress')[0].value = o;
     })
 });


// progress line END


// Show/hide popup START

$(".footer__btn").click(function() {
    $(".modal").fadeIn();
});

$(".modal__close").click(function() {
    $(".modal").fadeOut();
});