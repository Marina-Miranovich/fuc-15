$(function(){


    $('[data-lang]')
        .on('click', function() {
            document.l10n.requestLocales($(this).data('lang'));
            var lang = $(this).data('lang');

            if (lang === 'en-US') {
                $(this).html('ru').data('lang', 'ru-RU').attr('href', '#ru');
            }
            else if (lang === 'ru-RU') {
                $(this).html('en').data('lang', 'en-US').attr('href', '#en');
            }

        })
        .filter('[data-lang=' + document.l10n.supportedLocales[0] + ']')
        .addClass('lang-active');




    // map
    var markerImage = "images/marker.png";
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
    };

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
    };

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

});
