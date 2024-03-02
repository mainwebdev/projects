$(document).ready(function() {
  var rates = {};
  var sliders = initSliders();
  inputLabelResize();
	simplemarqueeInit();
	selectInit();
	rangeInit();
	datepickerInit();
	copyLeaders();
  choiceDelivery();
  toggleStepCalc();
  popupNoTime();
  mobMenu();
  writeRangeFunctionality();
  closeErrorMessage()
  tabsFunctionality();
  homeSelectInit();
  addTravelers();
  travelerIndex();
  delTravelers();
  addInsured();
  sendPhone();
  openMessenger();
  showFields();
  accordionInit();
  initSearchSelect();
  medFunctionality();
  cascoFunctionality();
  foreignCarFunctionality();
  insurancePeriodHighlight();

  var $steps = $(".step-calc-wrap");
  var $ticker = $(".js-ticker");
  if($steps.length || $ticker.length) {
    $.ajax({
      url: './getStat.php',
      type: 'GET',
      crossDomain: true,
      dataType: 'json',
      success: function(data) {
        if(Array.isArray(data)) {
          data.forEach(function(r) {
            if(r.CharCode === "EUR" && r.NumCode === "978") {
              rates["EUR"] = r.Value
            }
            if(r.CharCode === "USD" && r.NumCode === "840") {
              rates["USD"] = r.Value
            }
            if(r.CharCode === "RON" && r.NumCode === "946") {
              rates["RON"] = r.Value
            }
            if(r.CharCode === "UAH" && r.NumCode === "980") {
              rates["UAH"] = r.Value
            }
            if(r.CharCode === "RUB" && r.NumCode === "643") {
              rates["RUB"] = r.Value
            }
          });

          if($ticker.length) {
            setRates(rates);
          }

          if($steps.length) {
            calculateValueMain($steps, rates);
          }
        }
      },
    });
  }

  function SendSucces() {
    var stepBlock = $('[data-step-calc].active');
    var numStepBlock = stepBlock.attr('data-step-calc');
    $('[data-step-calc]').removeClass("active");
    numStepBlock++;
    $('[data-step-calc="'+numStepBlock+'"]').addClass("active");
    $('html, body').animate({ scrollTop: $('.calculator.active').offset().top}, 800);
  }

  $("#rca-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var data = {
      // step 1
      "autovehicul_inmatriculat": $form.find("select[name='autovehicul_inmatriculat']").find("option:selected").text(),
      "posesorul_autovehicolului": $form.find("select[name='posesorul_autovehicolului']").find("option:selected").text(),
      "domiciliul_persoanei_asigurate": $form.find("select[name='domiciliul_persoanei_asigurate']").find("option:selected").text(),
      "tipul_autovehiculului": $form.find("select[name='tipul_autovehiculului']").find("option:selected").text(),
      "capacitatea_cilindrica": $form.find("select[name='capacitatea_cilindrica']").find("option:selected").text(),
      "numarul_persoanelor": $form.find("select[name='numarul_persoanelor']").find("option:selected").text(),
      "valabilitatea_politei": $form.find("input[name='valabilitatea_politei']").closest(".js-auto-hidden").hasClass("js-show") ? $form.find("input[name='valabilitatea_politei']").val() : null,
      "date_despre_conducatori": getDriversData($form.find(".js-drivers-data .js-get-driver-value")),
      // step 2
      "tipul_certificatului_de_inmatriculare": $form.find("input[name='document-radio']:checked").val(),
      "nr_certificatului_de_inmatriculare": $form.find("input[name='nr_certificatului_de_inmatriculare']").val(),
      "nr_de_inregistrare": $form.find("input[name='nr_de_inregistrare']").val(),
      "conducatori_auto": getDriversDataStep2($form.find(".js-leaders-parent .row")),
      // step 3
      "livrare": $form.find("input[name='delivery-type']:checked").val(),
      "nume_prenume": $form.find("input[name='nume_prenume']").val(),
      "adresa_email": $form.find("input[name='adresa_email']").val(),
      "telefon": $form.find("input[name='telefon']").val(),
      "data_contractului_precedent": $form.find("input[name='data_contractului_precedent']").val(),
      "adresa_de_ridicare": $form.find("input[name='delivery-type']:checked").val() === "Ridicare de la oficiu" ? $form.find("select[name='adresa_de_ridicare']").find("option:selected").text() : null,
      "oras": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("select[name='oras']").find("option:selected").text() : null,
      "strada": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='strada']").val() : null,
      "nr": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='nr']").val() : null,
      "blocul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='blocul']").val() : null,
      "scara": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='scara']").val() : null,
      "apartamentul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='apartamentul']").val() : null,
      "plata_cu_cardul": $form.find("input[name='plata_cu_cardul']").prop('checked'),
      "achitare_prin_curier": $form.find("input[name='achitare_prin_curier']").prop('checked'),
    };

    $.ajax({
      url: './mail-rca.php',
      type: 'POST',
      crossDomain: true,
      dataType: 'html',
      cache: false,
      data: data,
      success: function(res) {
        SendSucces();
      },
    });

    function getDriversData($drivers) {
      var data = [];
      $drivers.each(function(_, dr) {
        var drData = {
          "stagiul_minim_persoanelor": $(dr).find("input[name='stagiul_minim_persoanelor']").val(),
          "varsta_minima": $(dr).find("input[name='varsta_minima']").val(),
          "de_cate_ori_ati_produs_accidente_in_trecut": $(dr).find("select[name='de_cate_ori_ati_produs_accidente_in_trecut']").find("option:selected").text(),
          "anii_in_care_ati_avut_asigurare_rca": $(dr).find("select[name='anii_in_care_ati_avut_asigurare_rca']").find("option:selected").text(),
        };

        data.push(drData);
      });

      return data;
    }

    function getDriversDataStep2($drivers) {
      var data = [];
      $drivers.each(function(_, dr) {
        var drData = {
          "numele_prenumele": $(dr).find("input[name='numele_prenumele']").val(),
          "codul_personal": $(dr).find("input[name='codul_personal']").val(),
          "dreptul_de_posesiune_a_atovehiculului": $(dr).find("select[name='dreptul_de_posesiune_a_atovehiculului']").find("option:selected").text(),
        };

        data.push(drData);
      });

      return data;
    }
  });

  $("#carte-verde-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var data = {
      // step 1
      "selectati_zona": $form.find("input[name='traveling-area']:checked").val(),
      "valabilitatea_asigurarii": $form.find("input[name='valabilitatea_asigurarii']").val(),
      "data_contractului_precedent": $form.find("input[name='data_contractului_precedent']").val(),
      "valabila_din_data": $form.find("select[name='valabila_din_data']").find("option:selected").text(),
      // step 2
      "tipul_certificatului": $form.find("input[name='document-radio']:checked").val(),
      "nr_certificatului": $form.find("input[name='nr_certificatului']").val(),
      "nr_de_inregistrare": $form.find("input[name='nr_de_inregistrare']").val(),
      "numele_prenumele": $form.find("input[name='numele_prenumele']").val(),
      "posesorul_vehiculului": $form.find("input[name='posesorul_vehiculului']").val(),
      "codul_personal": $form.find("input[name='codul_personal']").val(),
      "dreptul_de_posesiune_a_atovehiculului": $form.find("select[name='dreptul_de_posesiune_a_atovehiculului']").find("option:selected").text(),
      // step 3
      "livrare": $form.find("input[name='delivery-type']:checked").val(),
      "nume_prenume": $form.find("input[name='nume_prenume']").val(),
      "adresa_email": $form.find("input[name='adresa_email']").val(),
      "telefon": $form.find("input[name='telefon']").val(),
      "adresa_de_ridicare": $form.find("input[name='delivery-type']:checked").val() === "Ridicare de la oficiu" ? $form.find("select[name='adresa_de_ridicare']").find("option:selected").text() : null,
      "oras": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("select[name='oras']").find("option:selected").text() : null,
      "strada": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='strada']").val() : null,
      "nr": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='nr']").val() : null,
      "blocul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='blocul']").val() : null,
      "scara": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='scara']").val() : null,
      "apartamentul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='apartamentul']").val() : null,
      "plata_cu_cardul": $form.find("input[name='plata_cu_cardul']").prop('checked'),
      "achitare_prin_curier": $form.find("input[name='achitare_prin_curier']").prop('checked'),
    };

    $.ajax({
      url: './mail-carte-verde.php',
      type: 'POST',
      crossDomain: true,
      dataType: 'html',
      cache: false,
      data: data,
      success: function(res) {
        SendSucces();
      },
    });

  });

  $("#med-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var data = {
      // step 1
      "teritoriul_asigurat": $form.find("select[name='teritoriul_asigurat']").find("option:selected").text(),
      "suma_de_asigurare": $form.find("select[name='suma_de_asigurare']").find("option:selected").text(),
      "calatorii_multiple": $form.find("input[name='calatorii_multiple']").prop('checked'),
      "nr_de_zile_asigurate": $form.find("input[name='calatorii_multiple']").prop('checked')
        ? $form.find("select[name='nr_de_zile_asigurate']").find("option:selected").text()
        : null,
      "data_asigurarii": {
        from: $form.find("input[name='data_inceperii_asigurarii']").val(),
        to: $form.find("input[name='data_finala_a_asigurarii']").val(),
      },
      "scopul_calatoriei": $form.find("select[name='scopul_calatoriei']").find("option:selected").text(),
      "travels": getTravelsData($form.find(".js-travelers")),
      "riscul_anularii_calatoriei": $form.find("input[name='riscul_anularii_calatoriei']").prop('checked'),
      "asigurarea_bagajului": $form.find("input[name='asigurarea_bagajului']").prop('checked'),
      // step 2
      "asiguratul": getInsuredData($form.find(".js-insured-item")),
      // step 3
      "livrare": $form.find("input[name='delivery-type']:checked").val(),
      "nume_prenume": $form.find("input[name='nume_prenume']").val(),
      "adresa_email": $form.find("input[name='adresa_email']").val(),
      "telefon": $form.find("input[name='telefon']").val(),
      "adresa_de_ridicare": $form.find("input[name='delivery-type']:checked").val() === "Ridicare de la oficiu" ? $form.find("select[name='adresa_de_ridicare']").find("option:selected").text() : null,
      "oras": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("select[name='oras']").find("option:selected").text() : null,
      "strada": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='strada']").val() : null,
      "nr": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='nr']").val() : null,
      "blocul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='blocul']").val() : null,
      "scara": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='scara']").val() : null,
      "apartamentul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='apartamentul']").val() : null,
      "plata_cu_cardul": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='plata_cu_cardul']").prop('checked') : null,
      "achitare_prin_curier": $form.find("input[name='delivery-type']:checked").val() === "Livrare gratuită" ? $form.find("input[name='achitare_prin_curier']").prop('checked') : null,
    };

    $.ajax({
      url: './mail-med.php',
      type: 'POST',
      crossDomain: true,
      dataType: 'html',
      cache: false,
      data: data,
      success: function(res) {
        SendSucces();
      },
    });

    function getTravelsData($travels) {
      var data = [];
      $travels.each(function(_, tr) {
        var trData = {
          "nume_prenumele": $(tr).find("input[name='nume_prenumele']").val(),
          "varsta": $(tr).find("input[name='varsta']").val(),
        };

        data.push(trData);
      });

      return data;
    }

    function getInsuredData($insureds) {
      var data = [];
      $insureds.each(function(_, ins) {
        var insData = {
          "numele_prenumele": $(ins).find("input[name='numele_prenumele']").val(),
          "data_nasterii": $(ins).find("input[name='data_nasterii']").val(),
          "nr_pasaportului_1": $(ins).find("input[name='nr_pasaportului_1']").val(),
          "nr_pasaportului_2": $(ins).find("input[name='nr_pasaportului_2']").val(),
          "domiciliul": $(ins).find("input[name='domiciliul']").val(),
        };

        data.push(insData);
      });

      return data;
    }
  });

  $("#casco-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    var data = {
      // step 1
      "cu_franciza": $form.find("input[name='cu_franciza']").prop('checked'),
      "categorie_tip": $form.find("select[name='categorie_tip']").find("option:selected").text(),
      "an_producere": $form.find("select[name='an_producere']").find("option:selected").text(),
      "autovehicul_inmatriculat": $form.find("select[name='autovehicul_inmatriculat']").find("option:selected").text(),
      "valoare_autovehiculului": $form.find("input[name='valoare_autovehiculului']").val(),
      // step 2
      "person_type": $form.find("input[name='person-type']:checked").val(),
      "numele_prenumele": getDriversData($form.find("input[name='numele_prenumele']")),
      "telefon": $form.find("input[name='telefon']").val(),
      "adresa_email": $form.find("input[name='adresa_email']").val(),
      "varsta_minima": $form.find("input[name='varsta_minima']").val(),
      "stagiul_minim": $form.find("input[name='stagiul_minim']").val(),
      "accidente_in_trecut": $form.find("input[name='accidente_in_trecut']").prop('checked'),
      "de_cate_ori": $form.find("input[name='de_cate_ori']").val(),
      "valabilitatea_politei": $form.find("input[name='valabilitatea_politei']").val(),
      "valabilitatea_politei_date": $form.find("input[name='valabilitatea_politei_date']").val(),
    };

    function getDriversData($drivers) {
      var data = [];
      $drivers.each(function(_, tr) {
        var trData = {
          "numele_prenumele": $(tr).val(),
        };

        data.push(trData);
      });

      return data;
    }

    $.ajax({
      url: './mail-casco.php',
      type: 'POST',
      crossDomain: true,
      dataType: 'html',
      cache: false,
      data: data,
      success: function(res) {
        SendSucces();
      },
    });
  });

  $("#foreign-car-form").submit(function(e) {
    e.preventDefault();
    var $form = $(this);

    var data = {
      // step 1
      "obiectul_asigurarii": $form.find("select[name='obiectul_asigurarii']").find("option:selected").text(),
      "riscuri_de_asigurare": !($form.find("select[name='riscuri_de_asigurare']").attr("disabled") === "disabled")
        ? $form.find("select[name='riscuri_de_asigurare']").find("option:selected").text() : null,
      "valoare_bunului": $form.find("input[name='valoare_bunului']").val() + " lei",
      // step 2
      "person_type":  $form.find("input[name='person-type']:checked").val(),
      "numele_prenumele": $form.find("input[name='numele_prenumele']").val(),
      "telefon": $form.find("input[name='telefon']").val(),
      "adresa_email": $form.find("input[name='adresa_email']").val(),
    };

    $.ajax({
      url: './mail-foreign-car.php',
      type: 'POST',
      crossDomain: true,
      dataType: 'html',
      cache: false,
      data: data,
      success: function(res) {
        SendSucces();
      },
    });
  });

});

function setRates(rates) {
  var $rateContainer = $(".js-ticker");
  var $rateItem = $rateContainer.find(".exchange-index");

  $rateItem.each(function(_, rtI) {
    var currCode = $(rtI).attr("data-charcode");
    var $setValue = $(rtI).find(".exchange-index__value");
    $setValue.text(rates[currCode]);
  });
}

function openMessenger() {
  var messengersForm = $(".js-messenger-form");

  if(messengersForm.length) {
    messengersForm.submit(function(e) {
      e.preventDefault();
      var $form = $(this);
      var selected = $form.find(".js-msg-select").find("option:selected");
      var messengers = [
        {
          name: "whatsapp",
          link: "https://wa.me/37368034340",
        },
        {
          name: "messenger",
          link: "http://m.me/novabrokermd",
        },
        {
          name: "viber",
          link: "viber://chat?number=+37368034340",
        },
        {
          name: "telegram",
          link: "https://telegram.me/Novabroker",
        }
      ]

      if(selected.length) {
        var messenger = selected.val();

        messengers.forEach(function(msg) {
          if(msg.name === messenger) {
            var redirectUrl = msg.link;
            var win = window.open(encodeURI(redirectUrl), '_blank');
            win.focus();
          }
        });
      }
    });
  }
}

function sendPhone() {
  var phoneForm = $(".js-phone-form");

  if(phoneForm.length) {
    phoneForm.submit(function(e) {
      e.preventDefault();
      var $form = $(this);
      var phone = $form.find("input[type='tel']");

      if(phone.val().trim().length) {
        $.ajax({
          url: './mail.php',
          type: 'POST',
          dataType: 'html',
          data: {phone: phone.val()},
          success: function(data) {
            console.log(data);
            $(phone).val('');
            $('.js-continue-phone').removeClass('show');
            $('.js-succes-phone').addClass('show');
          },
          error: function(xhr, status) {
            // $('.js-continue-phone').removeClass('show');
          }
        });
      }
    });

  }
}

function homeSelectInit() {
  var s = $(".js-msg-select");

  if(s.length) {
    s.select2({
      minimumResultsForSearch: Infinity,
      language: "ro",
      width: 'style',
      placeholder: "Alege Messengerul",
    });

    s.val(null).trigger('change');
  }
}

function closeErrorMessage() {
  $(".js-error-message-close").click(function(e) {
    e.preventDefault();
    $(this).closest(".error-message").removeClass("js-show");
  });
}

function tabsFunctionality() {
  var $tabBtns = $(".js-tab-btn");

  $tabBtns.click(function(e) {
    e.preventDefault();
    var $self = $(this);
    var ind = $self.attr("data-tab");
    var $views = $self.closest(".js-tab-wrapper").find(".js-tab-view");
    var $currentView = $($views[ind]);
    var $slider = $currentView.find(".slick-slider");

    $tabBtns.removeClass("js-active");
    $views.removeClass("js-show");
    $self.addClass("js-active");
    $currentView.addClass("js-show");

    $slider.slick("refresh");

  });
}

function jbResizeSlider($slider) {
	$slickSlider = $slider
	$slickSlider.find('.slick-slide').height('auto')

	var slickTrack = $slickSlider.find('.slick-track')
	var slickTrackHeight = $(slickTrack).height()

	$slickSlider.find('.slick-slide').css('height', slickTrackHeight + 'px')
}

function writeRangeFunctionality() {
  var activateRangeBtns = $(".input-wrap-with-range .input-wrap__value");

  if(activateRangeBtns.length) {
    activateRangeBtns.each(function(_, activeRange) {
      var $activeRange = $(activeRange);
      var $controlWrap = $activeRange.closest(".input-wrap-with-range");
      var $control = $controlWrap.find(".input-hand-range");
      var $range = $controlWrap.find(".js-input-range");
      // var $output = $controlWrap.find(".input-wrap__value output");

      $activeRange
        .click(function(e) {
          onClickHandler();
        });

      $control
        .focusout(function(e) {
          setValueHandler();
        })
        .keyup(function(e) {
          e.preventDefault();
          if(e.keyCode === 13) {
            setValueHandler();
          }
        });

      function onClickHandler() {
        $controlWrap.addClass("js-hand-write");
        $control
          .val($range.val())
          .focus();
      }

      function setValueHandler() {
        var val = Number($control.val());
        var min = Number($range.attr("min"));
        var max = Number($range.attr("max"));

        if(val > max) val = max;
        if(val < min) val = min;

        $range.val(val).change();
        $controlWrap.removeClass("js-hand-write");
      }
    });

  }
}

function initSliders() {
  return {
    mainNewsSlider: mainNewsSlider(),
    newsSlider: newsSlider(),
    popularSlider: popularSlider(),
    mainReviewsSlider: mainReviewsSlider(),
  }
}

function mainNewsSlider() {
  var mainNewsSlider = $(".main-news__slider");

  if(mainNewsSlider.length) {
    mainNewsSlider.slick({
      arrows: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          variableWidth: false,
        }
      }
    ]
    });

    // mainNewsSlider.on('setPosition', function() {
		// 	jbResizeSlider(mainNewsSlider);
		// });

    return mainNewsSlider;
  }
}

function mainReviewsSlider() {
  var mainReviewsSlider = $(".main-reviews__slider");

  if(mainReviewsSlider.length) {
    mainReviewsSlider.slick({
      arrows: false,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    // mainReviewsSlider.on('setPosition', function() {
		// 	jbResizeSlider(mainReviewsSlider);
		// });

    return mainReviewsSlider;
  }
}

function newsSlider() {
  var newsSlider = $(".other-news__ul");

  if(newsSlider.length) {
    newsSlider.slick({
      arrows: false,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    return newsSlider;
  }
}

function popularSlider() {
  var popularSlider = $(".news-block__popular-slider");

  if(popularSlider.length) {
    popularSlider.slick({
      arrows: false,
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    return popularSlider;
  }
}

function inputLabelResize() {
  posLabel();

  $('body').on('click', '.js-pos-label', function(e){
    $(this).find("input").focus();
  });

  $('.js-pos-label').find("input").focus(function(){
    $(this).closest(".js-pos-label").addClass("selected");
  });

  $('.js-pos-label').find("input")
    .change(function(){
      if ($(this).val() != '' ) {
        $(this).closest(".js-pos-label").addClass("selected");
      } else {
        $(this).closest(".js-pos-label").removeClass("selected");
      }
    })
    .focusout(function(e) {
      if ($(this).val() != '' ) {
        $(this).closest(".js-pos-label").addClass("selected");
      } else {
        $(this).closest(".js-pos-label").removeClass("selected");
      }
    });


  function posLabel() {
    $('.js-pos-label').each(function() {
      if ($(this).find("input").val() != '' ) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    })
  }
}

function simplemarqueeInit() {
	$('.js-ticker').simplemarquee({
		speed: 30,
    cycles: Infinity,
    space: 0,
    delayBetweenCycles: 0,
    handleHover: true,
    handleResize: false
	});
}

function selectInit() {
  var dataAddress = [
    {
      id: 0,
      text: 'Oficiul Centru - <span class=\"light\">Chișinău, str. Pușkin 4  </span><a target="_blank" href=\"https://www.google.com/maps/place/Nova+Broker+Asigur%C4%83ri+(Carte+Verde,+RCA,+Asigur%C4%83ri+Medicale)+24%2F24/@47.0111876,28.7828174,14z/data=!4m5!3m4!1s0x0:0xbcb0c7abbd8f5cb1!8m2!3d47.0172299!4d28.8250673\" class=\"decor light\">VEZI HARTA</a>',
      html: 'Oficiul Centru - <span class=\"light\">Chișinău, str. Pușkin 4  </span><a target="_blank" href=\"https://www.google.com/maps/place/Nova+Broker+Asigur%C4%83ri+(Carte+Verde,+RCA,+Asigur%C4%83ri+Medicale)+24%2F24/@47.0111876,28.7828174,14z/data=!4m5!3m4!1s0x0:0xbcb0c7abbd8f5cb1!8m2!3d47.0172299!4d28.8250673\" class=\"decor light\">VEZI HARTA</a>'
    },
  ];
  var dataSquare = [
    {
      id: 0,
      text: 'Până la <output class=\"js-output\">1200</output> cm<sup>3</sup>',
      html: 'Până la <output class=\"js-output\">1200</output> cm<sup>3</sup>'
    },
    {
      id: 1,
      text: '1. Până la <output class=\"js-output\">1200</output> cm<sup>3</sup>',
      html: '1. Până la <output class=\"js-output\">1200</output> cm<sup>3</sup>'
  }];
  var $selects = $('.js-select');

  $selects.each(function(_, s) {
    var $select = $(s);

    if($select.prop("multiple")) {
      $select.select2({
        minimumResultsForSearch: Infinity,
        width: 'style',
        language: "ro",
        dropdownCssClass: "select-wrap-dropdown",
        multiple: true,
        closeOnSelect: false,
      });
    } else {
      $select.select2({
        minimumResultsForSearch: Infinity,
        width: 'style',
        language: "ro",
        dropdownCssClass: "select-wrap-dropdown",
      });
    }
  });

  selectDataInit('.js-select-address', dataAddress);
  selectDataInit('.js-select-square', dataSquare);
}

function selectDataInit(selector, data) {
  $(selector)
    .select2({
      minimumResultsForSearch: Infinity,
      width: 'style',
      language: "ro",
      data: data,
      templateResult: template,
      escapeMarkup: function(m) {
        return m;
      }
    })
    .closest(".select-wrap")
    .find(".select2-selection__rendered")
    .attr("title", "");
}

function template(data) {
  return data.html;
}

function rangeInit() {
	$('.js-input-range').rangeslider({
		polyfill : false,
	});
	var $document = $(document);
  var selector = '[data-rangeslider]';
  var $element = $(selector);

  $document.on('input', 'input[type="range"], ' + selector, function(e) {
    valueOutput(e.target);
  });
}

function valueOutput(element) {
  var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
  var value = element.value;
  var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0] || 0;
  if (output) {
    output[textContent] = value;
  }
}

function datepickerInit() {
	$('[data-toggle="datepicker"]').datepicker({
		format: 'dd.mm.yyyy',
	});
}

function copyLeaders() {
  $('body').on('click', '.js-add-leaders', function(e){
    e.preventDefault();

    var leadersItem = getTemplate('hbs-leaders-item');
    $('.js-leaders-parent').append(leadersItem);
    selectInit();
    inputLabelResize();
  })
}


function getTemplate(id_selector) {
  var source = document.getElementById(id_selector).innerHTML;
  var template = Handlebars.compile(source);
  return template;
}

function choiceDelivery() {
  $('.js-choice-deliver').change(function(){
    toggleDelivery();
  });
  function toggleDelivery() {
    $('.js-choice-deliver').each(function() {
      if ($(this).prop('checked')) {
        var typeDelivery = $(this).attr('data-type-delivery');
        $('.js-delivery-option').removeClass('show');
        $('.js-delivery-option[data-'+typeDelivery+']').addClass('show');
      }
    })
  }

  toggleDelivery();
}

function toggleStepCalc() {
  $('body').on('click', '.js-next-step-btn', function(e){
    e.preventDefault();
    var btn = $(this);
    stepCalc(btn);
  });

  $('body').on('click', '.js-prev-step-btn', function(e){
    e.preventDefault();
    var btn = $(this);
    stepCalc(btn);
  });

  function stepCalc(btn) {

    var stepBlock = $('[data-step-calc].active');
    var numStepBlock = stepBlock.attr('data-step-calc');

    if (btn.hasClass('js-next-step-btn')) {
      numStepBlock++;
      $('.js-calculator-steps li:nth-child('+numStepBlock+')').addClass("active");
    } else {
      $('.js-calculator-steps li:nth-child('+numStepBlock+')').removeClass("active");
      numStepBlock--;
    }

    
    $('.js-calculator-steps li:nth-child('+numStepBlock+')').addClass("active");
    $('[data-step-calc]').removeClass("active");
    $('[data-step-calc="'+numStepBlock+'"]').addClass("active");
    $('html, body').animate({ scrollTop: $('.header').height()}, 800);
  }
}

function popupNoTime() {
  $('body').on('click', '.js-continue-phone-close', function(e){
    e.preventDefault();
    $('.js-continue-phone').removeClass('show');
    $('.js-succes-phone').removeClass('show');
  });

  setTimeout(function() {
    $('.js-continue-phone').addClass('show');
  }, 5000);
}

function mobMenu() {
  $(".js-menu-btn").on("click", function(e) {
    e.preventDefault();
    $(".js-mob-menu").toggleClass("show");
    $(this).toggleClass("close-menu");
  });
}

function changeSelectData($select, data) {
  $select.empty().select2({
    minimumResultsForSearch: Infinity,
    width: 'style',
    language: "ro",
    data: data,
  })
}

function showAutoHiddenOption(selector, openFrom, show) {
  var openedArr = JSON.parse($(selector).attr("data-opened-from"));
  var isOpen = false;
  var ind = 0;

  openedArr.forEach(function(el, i) {
    if(el === openFrom) {
      isOpen = true;
      ind = i;
    }
  });

  if(show) {
    !isOpen && openedArr.push(openFrom);
  } else {
    isOpen && openedArr.splice(ind, 1);
  }

  $(selector)
    .attr("data-opened-from", JSON.stringify(openedArr));

  openedArr.length
    ? $(selector).addClass("js-show")
    : $(selector).removeClass("js-show")
}

function insurancePeriodHighlight() {
  var input = $(".js-internship-persons");

  if(input.length) {
    input.each(function(_, el) {
      var self = $(el);
      var $ruler = self.parent().find(".range__ruler");
      $($ruler.find("li")[self.val()]).addClass("selected");

      self.change(function(e) {
        var i = e.target.value;
        $ruler.find("li").removeClass("selected");
        $($ruler.find("li")[i]).addClass("selected");
      });
    })

  }
}

function getCalcEnum() {
  return {
    rca: {
      name: "rca",
      base: 770
    },
    carte_verde: {
      name: "carte-verde",
      base: [30, 238, 513]
    },
    med: {
      name: "med",
    },
    casco: {
      name: "casco",
    },
    foreign_car: {
      name: "foreign_car"
    }
  }
}

// calculate main function
function calculateValueMain($ctx, rates) {
  var calcEnum = getCalcEnum();
  var $context = $ctx;
  var $calcBtn = $context.find(".js-calc-btn");
  var base = $context.attr("data-calc");
  var rcaSumm, deliverySumm;

  if($context.length) {

    switch (base) {
      case calcEnum.rca.name:
        rcaSumm = calculateRca($context, calcEnum.rca.base);
        setRcaListeners($context, calcEnum.rca.base);
        break;
      case calcEnum.carte_verde.name:
        rcaSumm = calculateCarteVerde($context, calcEnum.carte_verde.base, rates.EUR);
        setCarteVerdeListeners($context, calcEnum.carte_verde.base, rates.EUR);
        break;
      case calcEnum.med.name:
        rcaSumm = calculateMed($context, rates.EUR);
        setMedListeners($context, rates.EUR);
        break;
      case calcEnum.casco.name:
        rcaSumm = calculateCasco($context, rates.EUR);
        setCascoListeners($context, rates.EUR);
        break;
      case calcEnum.foreign_car.name:
        rcaSumm = calculateForeignCar($context, rates.EUR);
        setForeignCarListeners($context, rates.EUR);
        break;
      case 500:
        rcaSumm = calcSumm($context, 500);
        break;
      default:
        break;
    }

    $context.find(".js-allow-next-control").change(function(e) {
      if(e.target.checked) {
        $(this).closest(".calculator__footer")
          .addClass("js-allow-next")
      } else {
        $(this).closest(".calculator__footer")
          .removeClass("js-allow-next")
      }
    });

    $calcBtn.on("click", function(e) {
      e.preventDefault();
      switch (base) {
        case calcEnum.rca.name:
          rcaSumm = calculateRca($context, calcEnum.rca.base);
          break;
        case calcEnum.carte_verde.name:
          rcaSumm = calculateCarteVerde($context, calcEnum.carte_verde.base, rates.EUR);
          break;
        case calcEnum.med.name:
          rcaSumm = calculateMed($context, rates.EUR);
          break;
        case calcEnum.casco.name:
          rcaSumm = calculateCasco($context, rates.EUR);
          break;
        case calcEnum.foreign_car.name:
          rcaSumm = calculateForeignCar($context, rates.EUR);
          break;
        case 500:
          rcaSumm = calcSumm($context, 500);
          break;
        default:
          break;
      }

      deliverySumm = deliveryCalc($context);
      var totalCalc = (Number(rcaSumm) + Number(deliverySumm)).toFixed(2);
      $context.find(".js-total-summ-calc").html(totalCalc);
    });
  }

}

// for calculator-foreign-car calculator
function foreignCarFunctionality() {
  var ctx = $(".step-calc-wrap");
  var insurance_object = ctx.find("select[name='obiectul_asigurarii']");
  var insurance_risks = ctx.find("select[name='riscuri_de_asigurare']");
  var insuranceData = {
    insurance_object: {
      imobile: "imobile",
      casnice: "casnice",
    }
  }

  insurance_object.change(function(e) {
    var val = $(e.target).find("option:selected").val();
    switch(val) {
      case insuranceData.insurance_object.imobile:
        insurance_risks.removeAttr("disabled")
          .closest(".js-auto-hidden").addClass("js-show");
        break;
      case insuranceData.insurance_object.casnice:
        insurance_risks.attr("disabled", "disabled")
          .closest(".js-auto-hidden").removeClass("js-show");
        break;
      default:
        break;
    }
  })
}

function setForeignCarListeners($context, rate) {
  var $stepCalc = $context.find(".step-calc-1");

  $stepCalc.change(function() {
    calculateForeignCar($context, rate);
  })
}

function calculateForeignCar($context, rate) {
  var rcaSumm = 1;
  var $setSumTo = $context.find(".js-summ-rca-calc");
  var insurance_object = $context.find("select[name='obiectul_asigurarii']").find("option:selected").val();
  var insurance_risks_val = +($context.find("select[name='riscuri_de_asigurare']").find("option:selected").val());
  var market_value = +($context.find("input[name='valoare_bunului']").val());
  var casnice_risks_val = 0.005;

  var insuranceData = {
    imobile: "imobile",
    casnice: "casnice",
  }
  if(insurance_object === insuranceData.imobile) {
    rcaSumm = market_value * insurance_risks_val;
  } else if(insurance_object === insuranceData.casnice) {
    rcaSumm = market_value * casnice_risks_val
  }

  rcaSumm = rcaSumm.toFixed(2);
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

// for casco calculator
function cascoFunctionality() {
  var cascoDateData = {
    franchize: [
      {
        id: 0,
        text: 'Autoturism',
      },
      {
        id: 1,
        text: 'Camioane',
      },
      {
        id: 2,
        text: 'Autobuze',
      },
      {
        id: 3,
        text: 'Remorci',
      },
      {
        id: 4,
        text: 'Tehnica agricola',
      },
    ],
    standart: [
      {
        id: 0,
        text: 'Autoturism',
      },
      {
        id: 1,
        text: 'Tehnica agricola',
      },
    ],
  };

  changeSelectData(
    $("select[name='categorie_tip']"),
    $("input[name='cu_franciza']").prop("checked")
      ? cascoDateData.franchize
      : cascoDateData.standart
  );

  $("input[name='cu_franciza']").change(function(e) {
    changeSelectData(
      $("select[name='categorie_tip']"),
      e.target.checked
        ? cascoDateData.franchize
        : cascoDateData.standart
    );
  });

}

function setCascoListeners($context, rate) {
  var $stepCalc = $context.find(".step-calc-1");

  $stepCalc.change(function() {
    calculateCasco($context, rate);
  })
}

function calculateCasco($context, rate) {
  var coefficient = 1;
  var rcaSumm = 1;
  var $setSumTo = $context.find(".js-summ-rca-calc");
  var isFranchize = $("input[name='cu_franciza']").prop("checked");
  var category = $context.find("select[name='categorie_tip']").find("option:selected").val();
  var year = $context.find("select[name='an_producere']").find("option:selected").val();
  var autoCost = Number($context.find("input[name='valoare_autovehiculului']").val());
  var standartData = [
    [4.7, 5, 5.3, 5.6, 6.2],
    [1.4, 1.6, 1.8, 2.1, 2.3],
  ];
  var franchizeData = [
    [4.5, 4.8, 5.1, 5.4, 5.8],
    [2.4, 2.7, 2.9, 3.2, 4],
    [3, 3.3, 3.8, 4, 4.5],
    [1.5, 1.8, 2.2, 2.5, 2.8],
    [1.2, 1.3, 1.5, 1.8, 2],
  ];

  if(isFranchize) {
    coefficient = franchizeData[category][year];
  } else {
    coefficient = standartData[category][year];
  }

  rcaSumm = ((coefficient / 100) * autoCost).toFixed(2);
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

// for med calculator
function medFunctionality() {
  var summaData = [
    {
      id: 5000,
      text: '5000€',
    },
    {
      id: 15000,
      text: '15000€',
    },
    {
      id: 30000,
      text: '30000€',
    },
    {
      id: 50000,
      text: '50000€',
    },
  ];

  var medDateData = [
    {
      id: 0,
      text: 15
    },
    {
      id: 1,
      text: 30
    },
    {
      id: 2,
      text: 45
    },
    {
      id: 3,
      text: 90
    },
    {
      id: 4,
      text: 135
    },
    {
      id: 5,
      text: 180
    }
  ]

  $("input[name='calatorii_multiple']").change(function(e) {
    e.target.checked
      ? $("select[name='nr_de_zile_asigurate']")
          .removeAttr("disabled")
          .closest(".input-wrap")
          .removeClass("disabled")
      : $("select[name='nr_de_zile_asigurate']")
          .val("")
          .attr("disabled", "disabled")
          .closest(".input-wrap")
          .addClass("disabled")

    e.target.checked && dateHandler();

    $("select[name='teritoriul_asigurat']").trigger("change");
  });

  $("input[name='data_inceperii_asigurarii'], input[name='data_finala_a_asigurarii']")
    .datepicker("setDate", new Date())
    .datepicker("setStartDate", new Date())
    .change(dateHandler);

  function dateHandler(e) {

    if($(this).is($("input[name='data_inceperii_asigurarii']"))) {
      var f = $(this);
      var t = $("input[name='data_finala_a_asigurarii']");
      t
        .datepicker("setStartDate", f.val())
        .val(f.val());
    }

    if($("input[name='calatorii_multiple']").prop("checked")) {
      var view = $("select[name='nr_de_zile_asigurate']");
      var diff = getTravelDateDifference();
      var data = [];

      if(diff <= 90) {
        data = [medDateData[0]]
      } else if(diff <= 180) {
        data = [medDateData[0], medDateData[1], medDateData[2]]
      } else if(diff <= 365) {
        data = [medDateData[0], medDateData[1], medDateData[2], medDateData[3], medDateData[4], medDateData[5]]
      }

      changeSelectData(view, data);
    }
  }

  $("select[name='teritoriul_asigurat']").change(function(e) {
    var teritory = $(this).val();
    var data = [];

    if($("input[name='calatorii_multiple']").prop("checked")) {
      switch(teritory) {
        case "1":
          data = [ summaData[2], summaData[3] ];
          break;
        case "2":
          data = [ summaData[2], summaData[3] ];
          break;
        case "3":
          data = [ summaData[3] ];
          break;
        case "4":
          data = [ summaData[2], summaData[3] ];
          break;
        default:
          break;
      }
    } else {
      switch(teritory) {
        case "1":
          data = [ summaData[0], summaData[1], summaData[2], summaData[3] ];
          break;
        case "2":
          data = [ summaData[1], summaData[2], summaData[3] ];
          break;
        case "3":
          data = [ summaData[3] ];
          break;
        case "4":
          data = [ summaData[3] ];
          break;
        default:
          break;
      }
    }
    changeSelectData(
      $("select[name='suma_de_asigurare']"),
      data
    );
  });
}

function getTravelDateDifference() {
  var from = $("input[name='data_inceperii_asigurarii']").datepicker("getDate");
  var to = $("input[name='data_finala_a_asigurarii']").datepicker("getDate");
  var diff = ((new Date(to)) - (new Date(from))) / (1000 * 60 * 60 * 24);

  if(diff > 0) {
    return diff + 1;
  }

  return 0;
}

function setMedListeners($context, rate) {
  var $stepCalc = $context.find(".step-calc-1");

  $stepCalc
    .change(function() {
      calculateMed($context, rate);
    });
}

function calculateMed($context, rate) {
  var coefficient = 1;
  var rcaSumm = 1;
  var $setSumTo = $context.find(".js-summ-rca-calc");
  var isMulty = $context.find(".step-calc-1 input[name='calatorii_multiple']").prop("checked");
  var teritoryNum = $context.find(".step-calc-1 select[name='teritoriul_asigurat']").find("option:selected").val();
  var summaNum = $context.find(".step-calc-1 select[name='suma_de_asigurare']").find("option:selected").val();
  var dataNum;
  var travelers = $context.find(".step-calc-1 .js-travelers");
  var goals = Number($context.find(".step-calc-1 select[name='scopul_calatoriei']").find("option:selected").val());
  var kids = 0;
  var standartData = [
    [0.3, 0.25, 0.2, 0.15],
    [0.4, 0.35, 0.3, 0.25],
    [0.5, 0.45, 0.35, 0.3],
    [0.75, 0.65, 0.5, 0.4],
    [1.5, 1.3, 1, 0.8],
  ];
  var multyData = [
    [10.5, 18.9, 22.05, 32.4, 48.6, 64.8],
    [10.5, 18.9, 22.05, 9, 48.6, 30],
    [16.9, 27.3, 32, 43.2, 64.8, 86.4],
    [24.75, 54.6, 63, 86.4, 129.6, 172.8],
  ];

  if(isMulty) {
    dataNum = Number($context.find(".step-calc-1 select[name='nr_de_zile_asigurate']").find("option:selected").val());

    if(summaNum === "30000" && (teritoryNum === "1" || teritoryNum === "2")) {
      coefficient = multyData[0][dataNum];
    } else if(summaNum === "30000" && (teritoryNum === "4")) {
      coefficient = multyData[1][dataNum];
    } else if(summaNum === "50000" && (teritoryNum === "1" || teritoryNum === "2" || teritoryNum === "3")) {
      coefficient = multyData[2][dataNum];
    } else if(summaNum === "50000" && (teritoryNum === "4")) {
      coefficient = multyData[3][dataNum];
    }
  } else {
    dataNum = Number(getTravelDateDifference());
    var diff = dataNum;

    if (dataNum <= 15) {
      dataNum = 0;
    } else if (dataNum <= 30) {
      dataNum = 1;
    } else if (dataNum <= 60) {
      dataNum = 2;
    } else {
      dataNum = 3;
    }

    if(summaNum === "5000" && (teritoryNum === "1")) {
      coefficient = standartData[0][dataNum];
    } else if(summaNum === "15000" && (teritoryNum === "1" || teritoryNum === "2")) {
      coefficient = standartData[1][dataNum];
    } else if(summaNum === "30000" && (teritoryNum === "1" || teritoryNum === "2")) {
      coefficient = standartData[2][dataNum];
    } else if(summaNum === "50000" && (teritoryNum === "1" || teritoryNum === "2" || teritoryNum === "3")) {
      coefficient = standartData[3][dataNum];
    } else if(summaNum === "50000" && (teritoryNum === "4")) {
      coefficient = standartData[4][dataNum];
    }

    coefficient = coefficient * diff;
  }

  if( goals > 0 ) {
    coefficient = coefficient * goals;
  }

  travelers.each(function(_, travels) {
    var current = $(travels);
    var age = parseFloat(current.find("input[name='varsta']").val());
    if(age && age >= 0) {
      if(age >= 65 && age <= 69) {
        coefficient = coefficient * 2.5;
      } else if(age >= 70 && age <= 74){
        coefficient = coefficient * 5;
      } else if(age <= 15) {
        // check has kids
        kids++;
      }
    }
  });

  // discounts
  if(travelers.length >= 10 && travelers.length <= 25) {
    coefficient = coefficient - (coefficient * 0.1);
  } else if(travelers.length >= 26 && travelers.length <= 50) {
    coefficient = coefficient - (coefficient * 0.15);
  } else if(travelers.length >= 51 && travelers.length <= 75) {
    coefficient = coefficient - (coefficient * 0.2);
  } else if(travelers.length > 75) {
    coefficient = coefficient - (coefficient * 0.25);
  }

  if(kids > 0) {
    // discount for kids
    coefficient = coefficient - (coefficient * 0.2);
  }

  if(goals < 0) {
    // discount for travel to Romania
    coefficient = coefficient - (coefficient * (goals / -100));
  }

  if(summaNum === "5000" || summaNum === "15000") {
    coefficient = coefficient < 2 ? 2 : coefficient;
  } else if(summaNum === "30000" || summaNum === "50000"){
    coefficient = coefficient < 3 ? 3 : coefficient;
  }

  rcaSumm = (coefficient * rate).toFixed(2);
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

// for carte verde calculator
function setchangeCarteVerdeData($context, rate) {
  var calcEnum = getCalcEnum();
  var radioControls = $context.find(".js-traveling-area");
  var $selectAreaAuto = $context.find(".js-select-area-auto");
  var areaAutoData = {
    zone_1: [
      {
        id: 0.7,
        text: 'autoturisme',
      },
      {
        id: 0.6,
        text: 'motociclete',
      },
      {
        id: 1.8,
        text: 'autocamioane cu masa totală de pînă la 3,5 tone',
      },
      {
        id: 3.0,
        text: 'autocamioane şi autotractoare cu masa totală de peste 3,5 tone',
      },
      {
        id: 1.7,
        text: 'autovehicule destinate transportului de persoane cu pînă la 17 ',
      },
      {
        id: 3.0,
        text: 'autovehicule destinate transportului de persoane cu peste 17 locuri',
      }
    ],
    zone_2: [
      {
        id: 1.0,
        text: 'autoturisme',
      },
      {
        id: 0.7,
        text: 'motociclete',
      },
      {
        id: 1.1,
        text: 'autocamioane cu masa totală de pînă la 3,5 tone',
      },
      {
        id: 1.0,
        text: 'autocamioane şi autotractoare cu masa totală de peste 3,5 tone',
      },
      {
        id: 1.0,
        text: 'autovehicule destinate transportului de persoane cu pînă la 17 ',
      },
      {
        id: 0.9,
        text: 'autovehicule destinate transportului de persoane cu peste 17 locuri',
      }
    ],
    zone_3: [
      {
        id: 0.7,
        text: 'autoturisme',
      },
      {
        id: 0.7,
        text: 'motociclete',
      },
      {
        id: 2.0,
        text: 'autocamioane cu masa totală de pînă la 3,5 tone',
      },
      {
        id: 1.2,
        text: 'autocamioane şi autotractoare cu masa totală de peste 3,5 tone',
      },
      {
        id: 3.0,
        text: 'autovehicule destinate transportului de persoane cu pînă la 17 ',
      },
      {
        id: 1.4,
        text: 'autovehicule destinate transportului de persoane cu peste 17 locuri',
      }
    ],
  };

  if(radioControls.length) {
    radioControls.change(function(e) {
      if(e.target.checked) {
        switch (e.target.value) {
          case "zone_1":
            changeSelectData($selectAreaAuto, areaAutoData.zone_1);
            break;
          case "zone_2":
            changeSelectData($selectAreaAuto, areaAutoData.zone_2);
            break;
          case "zone_3":
            changeSelectData($selectAreaAuto, areaAutoData.zone_3);
            break;
          default:
            break;
        }

        calculateCarteVerde($context, calcEnum.carte_verde.base, rate);
      }
    })
  }

}

function setCarteVerdeListeners($context, base, rate) {
  var $selectsValue = $context.find(".js-get-select-value");
  var $insurancePeriod = $context.find(".js-insurance-period");

  setchangeCarteVerdeData($context, rate);

  $selectsValue.change(function(e) {
    calculateCarteVerde($context, base, rate);
  });

  $insurancePeriod.change(function(e) {
    calculateCarteVerde($context, base, rate);
  });
}

function calculateCarteVerde($context, base, rate) {
  var coefficient = 1;
  var rcaSumm = 1;
  var $selectsValue = $context.find(".js-get-select-value");
  var $insurancePeriod = $context.find(".js-insurance-period");
  var $areaControls = $context.find(".js-traveling-area");
  var $setSumTo = $context.find(".js-summ-rca-calc");

  base.forEach(function(val, ind) {
    if($areaControls[ind].checked) {
      rcaSumm = val;
    }
  });

  if($selectsValue) {
    $selectsValue.each(function(_, select) {
      coefficient = coefficient * Number($(select).find("option:selected").val());
    })
  }

  if($insurancePeriod.length) {
    var rangeValue = Number($insurancePeriod.find(".js-input-range").val());

    var rangeData = {
      zone_1: [0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 1],
      zone_2_3: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 1]
    };

    $areaControls.each(function(_, el) {
      if(el.checked) {
        if(el.value === "zone_1") {
          coefficient = coefficient * rangeData.zone_1[rangeValue];
        } else {
          coefficient = coefficient * rangeData.zone_2_3[rangeValue];
        }
      }
    })
  }


  rcaSumm = Number((rcaSumm * coefficient).toFixed(2));
  rcaSumm = (rcaSumm * rate).toFixed(2);
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

// for rca calculate
function changeAutoOptions($context) {
  var autoSelect = $context.find(".js-select-auto");
  var autoOptionsEnum = {
    Autoturism: "Autoturism",
    Autovehicule: "Autovehicule",
    Tractoare: "Tractoare",
    Camioane: "Camioane",
    Motociclete: "Motociclete",

    // for registered vehicle
    Inside: "Republica Moldova",
    Outside: "În afara Republicii Moldova"
  };
  var autoOptionsData = {
    Autoturism: [
      {
        id: 0.7,
        text: 'pînă la 1200 cm3',
      },
      {
        id: 1.0,
        text: 'între 1201 şi 1600 cm3',
      },
      {
        id: 1.1,
        text: 'între 1601 şi 2000 cm3',
      },
      {
        id: 1.2,
        text: 'între 2001 şi 2400 cm3',
      },
      {
        id: 1.5,
        text: 'între 2401 şi 3000 cm3',
      },
      {
        id: 3.0,
        text: 'peste 3000 cm3',
      },
      {
        id: 3.0,
        text: 'taxi (numai pentru persoane juridice)',
      },
      {
        id: 1.0,
        text: 'cu motor electric',
      }
    ],
    Autovehicule: [
      {
        id: 1.5,
        text: 'pînă la 17 locuri',
      },
      {
        id: 2.0,
        text: 'de la 18 pînă la 30 locuri',
      },
      {
        id: 2.2,
        text: 'cu peste 30 locuri',
      },
      {
        id: 3.0,
        text: 'troleibuze',
      },
    ],
    Tractoare: [
      {
        id: 0.5,
        text: 'pînă la 45 CP inclusiv',
      },
      {
        id: 0.7,
        text: 'de la 46 CP pînă la 100 CP inclusiv',
      },
      {
        id: 0.9,
        text: 'peste 100 CP',
      },
    ],
    Camioane: [
      {
        id: 1.5,
        text: 'pînă la 3500 kg',
      },
      {
        id: 1.7,
        text: 'între 3501 şi 7500 kg',
      },
      {
        id: 2.0,
        text: 'între 7501 şi 16000 kg',
      },
      {
        id: 2.5,
        text: 'peste 16000 kg',
      },
    ],
    Motociclete: [
      {
        id: 0.3,
        text: 'pînă la 300 cm3',
      },
      {
        id: 0.5,
        text: 'peste 300 cm3',
      },
    ],
  };

  if(autoSelect.length) {
    autoSelect.each(function(_, aSelect) {
      $(aSelect).change(function(e) {
        var dataContent = $(this).find("option:selected").attr("data-content");
        var name = $(this).attr("data-name");

        if(dataContent && dataContent.trim().length) {
          switch (dataContent) {
            case autoOptionsEnum.Outside:
              showAutoHiddenOption(".js-auto-hidden", name, true);
              break;
            case autoOptionsEnum.Inside:
              showAutoHiddenOption(".js-auto-hidden", name);
              break;
            default:
              break;
          }
        } else {
          switch ($(this).find("option:selected").val()) {
            case autoOptionsEnum.Autoturism:
              changeSelectData($(".js-select-auto-calc"), autoOptionsData.Autoturism);
              showAutoHiddenOption(".js-auto-hidden", name);
              break;
            case autoOptionsEnum.Autovehicule:
              changeSelectData($(".js-select-auto-calc"), autoOptionsData.Autovehicule);
              showAutoHiddenOption(".js-auto-hidden", name, true);
              break;
            case autoOptionsEnum.Tractoare:
              changeSelectData($(".js-select-auto-calc"), autoOptionsData.Tractoare);
              showAutoHiddenOption(".js-auto-hidden", name, true);
              break;
            case autoOptionsEnum.Camioane:
              changeSelectData($(".js-select-auto-calc"), autoOptionsData.Camioane);
              showAutoHiddenOption(".js-auto-hidden", name);
              break;
            case autoOptionsEnum.Motociclete:
              changeSelectData($(".js-select-auto-calc"), autoOptionsData.Motociclete);
              showAutoHiddenOption(".js-auto-hidden", name);
              break;
            default:
              break;
          }
        }
      });
    })
  }
}

/*
  add driver function for rca calc (be disconnect because, change logic calc)
  runung in setRcaListeners function
*/
function addDrivers($context) {
  var driversSelect = $context.find(".js-select.js-drivers-quantity");
  if(driversSelect.length) {
    driversSelect.change(function(e) {
      var $parent = $(this).closest(".step-calc-1");
      var $container = $parent.find('.js-drivers-data');
      var value = Number($(this).find("option:selected")[0].text);

      $container.find(".js-select").select2('destroy');

      switch (value) {
        case 1:
          addItems($container, value);
          break;
        case 2:
          addItems($container, value);
          break;
        case 3:
          addItems($container, value);
          break;
        default:
          addItems($container, 1);
          break;
      }

      var $selects = $container.find(".js-select");

      $selects.each(function(_, s) {
        var $select = $(s);

        if($select.prop("multiple")) {
          $select.select2({
            minimumResultsForSearch: Infinity,
            width: 'style',
            language: "ro",
            dropdownCssClass: "select-wrap-dropdown",
            multiple: true,
            closeOnSelect: false,
          });
        } else {
          $select.select2({
            minimumResultsForSearch: Infinity,
            width: 'style',
            language: "ro",
            dropdownCssClass: "select-wrap-dropdown",
          });
        }
      });

      writeRangeFunctionality();
      rangeInit();
    });
  }
}

function addItems($container, count) {
  var calcEnum = getCalcEnum();
  var driversItem = getTemplate('hbs-drivers-item');
  var $context = $(".step-calc-wrap");

  $container.html("");

  for(var i = 0; i < count; i++) {
    $container.append(driversItem({count: i + 1}));
  }

  $context.find(".js-get-driver-value").change(function(e) {
    calculateRca($context, calcEnum.rca.base);
  })
}

function changeRcaLimite($context) {
  var person = $context.find("select[name='posesorul_autovehicolului']");
  var limit = $context.find("select[name='numarul_persoanelor']");
  var personData = {
    fizice: "fizice",
    juridice: "juridice",
    data: [
      {
        id: 1.2,
        text: 'Nelimitat',
      },
      {
        id: 1.0,
        text: 'Limitat (maxim 3 șoferi)',
      },
    ]
  }

  changeLimitSelect(person, limit, personData);

  person.change(function(e) {
    changeLimitSelect(person, limit, personData);
  })

  function changeLimitSelect(person, limit, personData) {
    switch(person.find("option:selected").attr("data-person")) {
      case personData.fizice:
        changeSelectData(limit, personData.data);
        break;
      case personData.juridice:
        changeSelectData(limit, [personData.data[0]]);
        break;
      default:
        changeSelectData(limit, personData.data);
        break;
    }
  }

}

function setRcaListeners($context, base) {
  var $selectsValue = $context.find(".js-get-select-value");
  var $insurancePeriod = $context.find(".js-insurance-period");
  var $driverValue = $context.find(".js-get-driver-value");
  var $selectAuto = $context.find(".js-select-auto");

  changeAutoOptions($context);
  changeRcaLimite($context);

  $selectAuto.change(function(e) {
    calculateRca($context, base);
  });

  $selectsValue.change(function(e) {
    calculateRca($context, base);
  })

  $driverValue.change(function(e) {
    calculateRca($context, base);
  })

  $insurancePeriod.change(function(e) {
    calculateRca($context, base);
  })
}

function calculateRca($context, base) {
  var coefficient = 1;
  var rcaSumm = base;
  var $selectsValue = $context.find(".js-get-select-value");
  var $insurancePeriod = $context.find(".js-insurance-period");
  var $driverValue = $context.find(".js-get-driver-value");
  var $setSumTo = $context.find(".js-summ-rca-calc");

  if($selectsValue) {
    $selectsValue.each(function(_, select) {
      coefficient = coefficient * Number($(select).find("option:selected").val());
    })
  }

  if($insurancePeriod.length && $insurancePeriod.hasClass("js-show")) {
    var insurancePeriodArr = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    var rangeValue = Number($insurancePeriod.find(".js-input-range").val());
    coefficient = coefficient * insurancePeriodArr[rangeValue];
  }

  if($driverValue.length) {
    $driverValue.each(function(_, driver) {
      var $driver = $(driver);

      if ($driver.length) {
        var ageDriver = Number($driver.find(".js-age-persons").val());
        var experienceDriver = Number($driver.find(".js-driver-experience").val());
        var numberYears = $driver.find(".js-number-years").val().length;
        var numberAccidents = Number($driver.find(".js-number-accidents").val());
        var bonusMalus = [
          [1,    1,    1,    1,    1],
          [0.75, 0.85, 0.95, 1.15, 2.5],
          [0.7,  0.8,  0.9,  1,    2.5],
          [0.65, 0.75, 0.85, 0.95, 2.5],
          [0.6,  0.7,  0.8,  0.9,  2.5],
          [0.55, 0.65, 0.75, 0.85, 2.5],
          [0.5,  0.6,  0.7,  0.8,  2.5],
        ];

        coefficient = coefficient * bonusMalus[numberYears][numberAccidents];

        if (ageDriver < 23 && experienceDriver <= 2) {
          coefficient = coefficient * 1.2;
        } else if (ageDriver < 23 && experienceDriver > 2) {
          coefficient = coefficient * 1.1;
        } else if(ageDriver >= 23 && experienceDriver <= 2) {
          coefficient = coefficient * 1;
        } else if(ageDriver >= 23 && experienceDriver > 2) {
          coefficient = coefficient * 0.9;
        }
      }
    })
  }

  rcaSumm = Number((rcaSumm * coefficient).toFixed(2));
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

function calcSumm($context, base) {
  var coefficient = 1;
  var rcaSumm = base;
  var $checkboxes = $context.find(".calculator[data-step-calc=1] input[type=checkbox]:checked");
  var $selects = $context.find(".calculator[data-step-calc=1] .js-select");
  var $cylindricalCapacity = $context.find(".js-cylindrical-capacity");
  var $internshipPersons = $context.find(".js-internship-persons");
  var $agePersons = $context.find(".js-age-persons");
  var $setSumTo = $context.find(".js-summ-rca-calc");

  if ($checkboxes.length) {
    $checkboxes.each(function(){
      coefficient = coefficient * 0.5;
      console.log(coefficient);
    });
  }
  if ($selects.length) {
    $selects.each(function(){
      coefficient = coefficient * Number($(this).find("option:selected").val());
    });
  }

  if ($cylindricalCapacity.length) {
    cylindricalCapacity = $cylindricalCapacity.val();
    if (cylindricalCapacity < 500) {
      coefficient = coefficient * 1.5;
    } if (cylindricalCapacity  > 500 && cylindricalCapacity < 1500) {
      coefficient = coefficient * 1.8;
    }
    if (cylindricalCapacity > 1500) {
      coefficient = coefficient * 2;
    }
  }

  if ($internshipPersons.length) {
    var internshipPersons = $internshipPersons.val()
    if (internshipPersons < 3) {
      coefficient = coefficient * 1.5;
    } if (internshipPersons > 3 && internshipPersons < 7) {
      coefficient = coefficient * 1.8;
    }
    if (internshipPersons > 7) {
      coefficient = coefficient * 2;
    }
  }

  if ($agePersons.length) {
    var internshipPersons = $agePersons.val()
    if (internshipPersons < 20) {
      coefficient = coefficient * 0.5;
    } if (internshipPersons > 20 && internshipPersons < 40) {
      coefficient = coefficient * 1;
    }
    if (internshipPersons > 40) {
      coefficient = coefficient * 1.8;
    }
  }

  rcaSumm = Number((rcaSumm * coefficient).toFixed(2));
  $setSumTo.html(rcaSumm);
  return rcaSumm;
}

function deliveryCalc($context) {
  var deliverySumm = 0;
  $context.find(".js-summ-delivery-calc").html(deliverySumm);
  return deliverySumm;
}


function addTravelers() {
  $('body').on('click', '.js-add-travelers', function(e){
    e.preventDefault();
    var indexNum = travelerIndex();
    var context = {
      indexNum: indexNum,
    }

    var source =  $('#hbs-travelers-item').html();
    var template = Handlebars.compile(source);
    template  = template(context);
    $('.js-travelers-parent').append(template);
    inputLabelResize();
    $(this).closest(".step-calc-1").trigger("change");
  })
}

function travelerIndex() {
  var indexNum = 1;
  $('.js-travelers').each(function(){
    $(this).find(".js-travelerIndex").html(indexNum);
    indexNum++;
  });
  return indexNum;
}

function delTravelers() {
  $('body').on('click', '.js-del-row', function(e){
    e.preventDefault();
    var p = $(this).closest(".step-calc-1");
    $(this).closest(".js-travelers").remove();
    travelerIndex();
    p.trigger("change");
  })
}

function addInsured() {
  var indexNum = 1;
  $('body').on('click', '.js-add-insured', function(e){
    e.preventDefault();
    indexNum++;
    var context = {
      indexNum: indexNum,
    }

    var source =  $('#hbs-insured-item').html();
    var template = Handlebars.compile(source);
    template  = template(context);
    $('.js-insured-parent').append(template);
    datepickerInit();
    inputLabelResize();
  })


}

function showFields() {
  $("body").on("click", "[data-show-fields]", function(e){
    e.preventDefault();
    var showFields = $(this).attr("data-show-fields");
    $("[data-"+showFields+"]").toggleClass("hide-field");
  })
}

function accordionInit() {
  if ($('.js-accordion').length) {
    $('.js-accordion').accordion({
      "transitionSpeed": 400
    });
  }
};

function initSearchSelect() {
  var s = $(".js-select-search");

  if(s.length) {
    s.selectize();
    // s[0].selectize.clear();
  }
}

