$(function(){
    $('#defaultCountdown').countdown({
        date: "March 27, 2015 19:00:00"
    });

    document.l10n.addEventListener('ready', function(a,b){
      if(document.l10n.supportedLocales.length){
        $('[data-lang]').removeClass('lang-active')
        .on('click', function(){
          document.l10n.requestLocales($(this).data('lang'));
        })
        .filter('[data-lang='+document.l10n.supportedLocales[0]+']').addClass('lang-active');

      }
    });


    // map
    markerImage = "../images/marker.png";

    var markerImage1 = new google.maps.MarkerImage(markerImage, null, null, new google.maps.Point(15,40), new google.maps.Size(25,40));

    var  initialize = function() {
        var mapOptions = {
            center: new google.maps.LatLng(53.8907667,27.5372905),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(53.8907667,27.5372905),
            map: map,
            icon: markerImage1
        });
    }

    initialize();

    var expandLink = $('.expand-link');
    var move = false;
    var heightSection = 0;

    expandLink.click(function(e){
        e.preventDefault();
        if(!move){
            move = true;
            var nextSection = $(this).parent().parent().next();

            if(nextSection.hasClass('open')){
                nextSection.animate({height : 0},600,function(){
                   $(this).removeClass('open');
                   move = false;
                });
            } else{
                heightSection = nextSection.find('.no-inside').outerHeight();
                nextSection.animate({height : heightSection},600,function(){
                    $(this).addClass('open');
                    move = false;
                });
            }
        }
    });

    $(window).resize(function(){
        var section = $('.section.open');
        if(section.length){
            $.each(section,function(){
                $(this).height($(this).find('.no-inside').outerHeight());
            });
        }
    });


    /*
    * Sticky menu
    * */

    var topNavElement = $('.top_nav'),
        stickyNavTop = topNavElement.offset().top,
        stickyNav = function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            topNavElement.addClass('sticky');
        } else {
            topNavElement.removeClass('sticky');
        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });


    /* Popups */
    $('.speaker_wrapper').click(function() {
        var popup = $("." + $(this).data('url'));

        if (popup.css('display') === 'block') {
            return false;
        }

        $('.popup').removeClass('active');

        var overlay = $(".overlay");

        popup.addClass('active');
        recalculateTopLeft();
        overlay.show();
    });

    $('.popup_close').click(function() {
        $('.popup').removeClass('active');
        $(".overlay").hide();
    });

    $(window).resize(function(){
        recalculateTopLeft();
    });

    function recalculateTopLeft() {
        var popup = $(".active");

        if (popup.length < 1) {
            return;
        }

        var screenWidth = $(window).width(),
            screenHeight = $(window).height(),
            popupWidth = popup.width(),
            popupHeight = popup.height(),
            paddingTop = popup.css("padding-top"),
            paddingBottom = popup.css("padding-bottom"),
            paddingLeft = popup.css("padding-left"),
            paddingRight = popup.css("padding-right");

        paddingTop = parseInt(paddingTop.substr(0, paddingTop.length - 2));
        paddingBottom = parseInt(paddingBottom.substr(0, paddingBottom.length - 2));
        paddingLeft = parseInt(paddingLeft.substr(0, paddingLeft.length - 2));
        paddingRight = parseInt(paddingRight.substr(0, paddingRight.length - 2));
        var left = ( ( (screenWidth - popupWidth - paddingLeft - paddingRight) / 2 ) / screenWidth ) * 100;
        var top = ( ( (screenHeight - popupHeight - paddingTop - paddingBottom) / 2 ) / screenHeight ) * 100;

        popup.css({
            top: top + '%',
            left: left + '%'
        });
    }

});
