
//snippet optimizes loading Twitter’s widgets JavaScript
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

//this is a hack to make widget's width more than standard 520px
twttr.ready(function (twttr) {
    twttr.events.bind(
        'rendered',
        function(ev){
            var tw_iframe = ev.target;
            var head = $(tw_iframe).contents().find( 'head' );
            if (head.length) {
                head.append('<style type="text/css">.timeline { max-width: none !important; width: 99% !important; max-height: none !important; height: 95% !important; margin: 0 auto !important; } .timeline .stream { max-width: none !important; width: 99% !important; max-height: none !important; height: 95% !important; margin: 0 auto !important; } </style>');
                console.log(head.html());
            }
        }
    )
});