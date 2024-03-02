$(document).ready(function() {
	hint();
	test();
	wowInit();
	scrollLink();
	mobMenu();
	scrollHeader();

});

function wowInit() {
	wow = new WOW({
    mobile: false,
  })
  wow.init();
}


// https://designer.mocky.io/manage/delete/6fe490b7-1ad1-4f7f-a390-c91207496cee/UEGcY8DSuoP7J2Fde82N6BBWIEDXikBZZkhO

function test() {

	// var xhr = new XMLHttpRequest()
	// var testData;
	// xhr.open(
	//   'GET',
	//   // 'https://run.mocky.io/v3/6fe490b7-1ad1-4f7f-a390-c91207496cee',
	//   '../json/test.json',
	//   true
	// )
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.send()

	// xhr.onreadystatechange = function() {
	//   if (xhr.readyState != 4) {
	//     return
	//   }

	//   if (xhr.status === 200) {
	//     testHandler(JSON.parse(xhr.responseText));
	//   } else {

	//   }
	// }



	$.getJSON("/json/test.json", function(data) {
  	testHandler(data)
	});

	function testHandler(testData) {
		var testWrap = $(".test");
		var questionsStepQuantity = testData.questions.length;
		var questionsOnStepQuantity;
		var activeStep = 1;
		var questionsContainer = $(".test__answer-wrap");
		var testTitle = $(".js-test-title");
		var btnNext = $(".js-test-btn-next");
		var btnPrev = $(".js-test-btn-prev");
		var answerNum = $(".js-test-answer-num");
		var testQuestion = $(".js-test-question");
		var questions, dataWeight, dataWeightSumm = 0;
		var answers = [];
		setQuestions()

		

		btnNext.click(function(e){
			e.preventDefault();
			nextStep();
		});

		btnPrev.click(function(e){
			e.preventDefault();
			backQuestion();
		});


		function nextStep() {
			if (activeStep <= questionsStepQuantity) {
				dataWeight = questionsContainer.find("input:checked").attr("data-weight");
				dataWeight = parseFloat(dataWeight);
				
				if (dataWeight >= 0) {
					saveAnswers();
					dataWeightSumm = dataWeightSumm + dataWeight;
					activeStep++;
					setQuestions();
					activeBack();

				} else {
					btnNext.text("Выберете ответ");
					setTimeout(function(){
						btnNext.text("Следующий вопрос");
					}, 2000)

				}
			} else {
				renew();
			}	
		}

		function setQuestions() {
			if (activeStep <= questionsStepQuantity) {
				testQuestion.html(testData.questions[activeStep-1].text);
				answerNum.html(activeStep + " of " + questionsStepQuantity);
				questionsContainer.html("");
				
				for (var i = 0; i < testData.questions[activeStep-1].options.length; i++) { // выведет 0, затем 1, затем 2
					questionsContainer.append(questionsAdd(i));
				}

				questionsContainer.fadeOut(200, function(){questionsContainer.fadeIn()});
			} else {
				result();
			}
		}

		function questionsAdd(i) {
			questions = '<label class="checkbox">'+
				'<input type="radio" class="checkbox__control" name="answer-1" data-weight="' + testData.questions[activeStep-1].options[i].weight + '">'+
				'<span class="checkbox__control-fake"></span>'+
			 	' <span class="checkbox__label">' + testData.questions[activeStep-1].options[i].text + '</span>'+
			'</label>'
			return questions;
		}


		function saveAnswers() {
			answers.push(dataWeight);
			// console.log(answers);
		}

		function activeBack() {

			if (activeStep > 1) {
				btnPrev.addClass("active");
			} else {
				btnPrev.removeClass("active");
			}
		}


		function result() {
			// btnNext.text("Пройти тест заново");
			btnNext.text("Take the test again");
			// testTitle.html("Результаты <br>теста");
			testTitle.html("Test <br>results");
			// testQuestion.text("Ваши ответы показывают, что у вас признаки эректильной дисфункции "+ testData.results[dataWeightSumm].result_text +" степени.")
			testQuestion.text("Your answers indicate that you have signs of erectile dysfunction "+ testData.results[dataWeightSumm].result_text +" degrees.")
			testWrap.addClass("result");
			// $(".test__question").append("<p>Рекомендации по подбору терапии для Ваших пациентов с ЭД средней степени тяжести.</p>")
			$(".test__question").append("<p>Recommendations for selecting therapy for your patients with moderate ED.</p>")
			btnPrev.hide();
			$(".test__answer-num-mob").hide();
			questionsContainer.html("");
			answers = [];
			dataWeightSumm = 0;
		}

		function renew() {
			activeStep = 1;
			// btnNext.text("Следующий вопрос");
			btnNext.text("Next question");
			// testTitle.html("Оцени свое <br>сексуальное <br>здоровье ");
			testTitle.html("Rate your <br>sexual <br>health ");
			testQuestion.hide();
			testWrap.removeClass("result");
			$(".test__question").hide();
			btnPrev.show().removeClass("active");
			$(".test__answer-num-mob").show();
			setQuestions();
			answers = [];
			dataWeightSumm = 0;
		}

		function backQuestion() {
			if (activeStep > 1) {
				activeStep--;
				var lastAnswerDataWeight = parseFloat(answers[activeStep-1]);
				dataWeightSumm = dataWeightSumm - lastAnswerDataWeight;
				setQuestions();
				activeBack();
				questionsContainer.find("input[data-weight=" + lastAnswerDataWeight + "]").prop('checked', true);
				answers.splice(-1, 1);
			}
		}
	} 
}

function hint() {
	$(".interesting-fact__link").click(function(){
		$(".interesting-fact").removeClass("active");
		$(this).closest(".interesting-fact").addClass("active");
	});

	$(".interesting-fact__close").click(function(){
		$(this).closest(".interesting-fact").removeClass("active");
	});


	$(document).mouseup(function (e){ 
		var div = $(".interesting-fact"); 
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
			div.removeClass("active"); 
		}
	});

}

function scrollLink() {
	$('.js-scroll').click( function(e){
	e.preventDefault();
		var scroll_el = $(this).attr('href');
	  if ($(scroll_el).length != 0) { 
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); 
	  }
	  return false; 
	});
}

function mobMenu() {
	$(".menu-btn").on("click", function(e) {
		e.preventDefault();
		$(".mob-menu").toggleClass("show");
		$(".menu-btn").toggleClass("close-menu");
	});

}

function scrollHeader() {
	$(window).scroll(function(){
    if ($(window).scrollTop() > 80) {
      $('.header').addClass('scroll');
    }
    else {
      $('.header').removeClass('scroll');
    }
	});
}

