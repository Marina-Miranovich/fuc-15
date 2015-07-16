$(function(){

    var currentDate = new Date();
    var futureDate  = new Date(currentDate.getFullYear(), 7, 29);
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    $('#defaultCountdown').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true
    });

    // document.l10n.addEventListener('ready', function(a,b){
    //   if(document.l10n.supportedLocales.length){
    //     $('[data-lang]').removeClass('lang-active')
    //     .on('click', function(){
    //       document.l10n.requestLocales($(this).data('lang'));
    //     })
    //     .filter('[data-lang='+document.l10n.supportedLocales[0]+']').addClass('lang-active');

    //   }
    // });



    // $(window).resize(function(){
    //     var section = $('.section.open');
    //     if(section.length){
    //         $.each(section,function(){
    //             $(this).height($(this).find('.no-inside').outerHeight());
    //         });
    //     }
    // });
});


