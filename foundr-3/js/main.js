// nav scrolling and progress START

$('.nav a').click( function(){ 
var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) { 
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top+10 }, 500); 
    }
    return false; 
});


var menu_selector = ".nav"; 

function navigationStateUpdate(){
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);
        if (target.position().top < scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        }
        else if(target.position().top + target.outerHeight() <= scroll_top && target.position().top <= scroll_top) {
            $(this).removeClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}

$(document).ready(function(){
    navigationStateUpdate();
});

$(document).on("scroll", navigationStateUpdate);



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

$('.menu-btn.open').click( function(e){ 
	e.preventDefault();
	$(".overlay").addClass('visible');
	$(".nav-wrap").addClass('open');
	$('.menu-btn.close').show(200);
});


$('.menu-btn.close, .nav a').click( function(e){ 
	e.preventDefault();
	$(".overlay").removeClass('visible');
	$('.menu-btn.close').hide(200);
	$(".nav-wrap").removeClass('open');
});

jQuery(function($){
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".nav-wrap"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			$(".overlay").removeClass('visible');
			$('.menu-btn.close').hide(200);
			$(".nav-wrap").removeClass('open');
		}
	});
});


function calc() {
	var	dollar = $( ".dollar input").val();
	 var	sharp = $( ".sharp input").val();
	 var	percent = $( ".percent input").val();
	 var result = dollar * sharp * percent;
	 $(".result-value").text(result);
}

$( ".input-wrap input").change(function() {
	calc();
});

$(document).ready(function(){
    calc();
});