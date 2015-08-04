$(function(){



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
    markerImage = "images/marker.png";

    var markerImage1 = new google.maps.MarkerImage(markerImage, null, null, new google.maps.Point(15,40), new google.maps.Size(25,40));
    var HUGE_MAP_CENTER_LAT = 55.797042;
    var HUGE_MAP_CENTER_LNG = 37.537526;
    var MEDIUM_BREAK_POINT = 1450;
    var MEDIUM_MAP_CENTER_LAT = 55.797042;
    var MEDIUM_MAP_CENTER_LNG = 37.540526;
    var SMALL_BREAK_POINT = 800;
    var SMALL_MAP_CENTER_LAT = 55.797842;
    var SMALL_MAP_CENTER_LNG = 37.537526;

    var getCenterCoords = function () {
        var screenWidth = $(window).width();

        if (screenWidth > MEDIUM_BREAK_POINT) {
            return {
                lat: HUGE_MAP_CENTER_LAT,
                lng: HUGE_MAP_CENTER_LNG
            };
        } else if (screenWidth < SMALL_BREAK_POINT) {
            return {
                lat: SMALL_MAP_CENTER_LAT,
                lng: SMALL_MAP_CENTER_LNG
            };
        } else {
            return {
                lat: MEDIUM_MAP_CENTER_LAT,
                lng: MEDIUM_MAP_CENTER_LNG
            };
        }
    }

    var  initialize = function() {
        var coordinates = getCenterCoords();
        var mapOptions = {
            center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
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

        var mapElement = document.getElementById('map');

        if (mapElement === null) {
            return;
        }
        var map = new google.maps.Map(mapElement, mapOptions);

        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(55.797042, 37.537526),
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



    var MAX_MOBILE_SCREEN_WIDTH = 900;

    $(window).resize(function() {
        var screenWidth = $(window).width();

        isMobile = (screenWidth <= MAX_MOBILE_SCREEN_WIDTH);

        //stickyNav();
        recalculateTopLeft();
    });


    /*
    * Sticky menu
    * */

    var topNavElement = $('.top_nav'),
        screenWidth = $(window).width(),
        isMobile = (screenWidth <= MAX_MOBILE_SCREEN_WIDTH),
        stickyNavTop = topNavElement.offset().top,
        stickyNav = function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > stickyNavTop) {
                if (isMobile) {
                    topNavElement.hide();
                    $('.top_nav_mobile').show();
                }
                else {
                    $('.top_nav_mobile').hide();
                    topNavElement.show();
                    topNavElement.addClass('sticky')
                }
            }
            else {
                if (isMobile) {
                    topNavElement.show();
                    $('.top_nav_mobile').hide();
                }

                topNavElement.removeClass('sticky');
            }

    };

    //stickyNav();
    $(window).scroll(function() {
        //stickyNav();
    });


    // Popups
    /*$('.show_popup').click(function() {
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

    $('.overlay').click(function() {
        $('.overlay').hide();
        $('.popup').removeClass('active');
    });*/


    /* Mobile */
    $('.hamburger').click(function(event) {
        $('.mobile_menu').show();
        $('.overlay_mobile_menu').show();
    });

    $('.overlay_mobile_menu').click(function() {
        $(this).hide();

        var mobile_menu = $('.mobile_menu');
        if (mobile_menu.css('display') === 'block') {
            mobile_menu.hide();
        }
    });

    //disable all scrolling on mobile devices while menu is shown
    jQuery('.overlay_mobile_menu').bind('touchmove', function (e) {
        e.preventDefault()
    });

    $('.popup_close').click(function() {
        $('.popup').removeClass('active');
        $(".overlay").hide();
    });

    var locales = [
            { lang: "en-US", href:"#en", html: 'en' },
            { lang: "ru-RU", href:"#ru", html: 'ru' } ],
        toggleIndex = 1;

    $('.lang-toggle').click(function(e) {
       $(this).data('lang', locales[toggleIndex].lang).attr('href', locales[toggleIndex].href).html(locales[toggleIndex].html);
        toggleIndex = toggleIndex === 1 ? 0: 1;
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
