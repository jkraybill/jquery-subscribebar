"use strict";
(function($) {

    $.subscribeBar = function(options) {

        var defaults = {
            acceptCookieName: 'accept_cookie',
            acceptCookieValue: 1,
            checkAcceptCookie: false,
            debug: false,
            element: 'body',
            emailClass: "",
            emailPlaceholder: "email adress",
            enableGaEvent: false,
            emailId: 'email',
            emailName: 'email',
            formAction: "#",
            formClass: "",
            gaEventCategory: "CTA",
            gaEventAction: "subscribe to newsletter",
            gaEventActionCancel: "close subscribe bar",
            gaEventLabel: "top subscribe bar",
            msg: "Stay tuned, subscribe to our newsletter!",
            msgClass: "",
            nextShow: 15,
            submitClass: "",
            submitLabel: "SUBSCRIBE",
            submitUrl: "#",
        };

        var settings = $.extend(defaults, options);

        // Debug
        // $.cookie('accept_cookie', 1, { expires: 30});

        // If user already closed the bar, don't show it again
        if (($.cookie('jsbClosedBar') == '1') || (($.cookie('jsbDidSubscribe') == '1'))) {
            if (settings.debug) {
                console.log("user closed bar or subscribed");
            }
            return false;
        }

        // Do we check if user allows or not cookies?
        if (settings.checkAcceptCookie) {
            if (settings.debug) {
                console.log("accept cookie value: "+$.cookie(settings.acceptCookieName));
            }
            // Verify that user has accepted cookies
            if ($.cookie(settings.acceptCookieName) == settings.acceptCookieValue) {
                if (settings.debug) {
                    console.log("accepting cookies");
                }
                showBar();
            } else {
                // The user didn't allow cookies
                if (settings.debug) {
                    console.log("user didn't accept cookies on this page");
                }
                return false;
            }
        } else {
            if (settings.debug) {
                console.log("don't check if accepting cookies");
            }
            showBar();
        }

        function showBar() {
            var bMsg = '<span class="'+settings.msgClass+'">'+settings.msg+'</span>';
            var bForm = '<form id="jsb" action="'+settings.formAction+'" class="'+settings.formClass+'" method="POST" url="'+settings.formAction+'">';
            var bEmail = '<input type="text" id="'+settings.emailId+'" name="'+settings.emailName+'" placeholder="'+settings.emailPlaceholder+'" class="'+settings.emailClass+'">';
            var bSubmit = '<input id="jsbSubscribe" type="button" value="'+settings.submitLabel+'" class="'+settings.submitClass+'">';
            $(settings.element).append('<div id="subscribe-bar" class="fixed">'+bMsg+bForm+bEmail+bSubmit+'</form><a href="#" class="jsb-close"></a></div>');
            return true;
        }

        function removeBar() {
            $('#subscribe-bar').hide(0,function(){$('#subscribe-bar').remove();});
        }

        $("#jsbSubscribe").on('click', function(e){
            e.preventDefault();
            $.cookie('jsbDidSubscribe', '1', { expires: 3650});
            if (settings.debug) {
                console.log("send submit event");
            }
            if (settings.enableGaEvent) {
                if (typeof ga != "undefined") {
                    ga('send', 'event', settings.gaEventCategory, settings.gaEventAction, settings.gaEventLabel);
                }
            }
            $("#jsb").submit();
        });

        $(".jsb-close").on('click', function(e){
            e.preventDefault();
            // We'll show the bar again in x days
            $.cookie('jsbClosedBar', '1', { expires: settings.nextShow});
            // Remove the JSB bar
            removeBar();
            // If we want an event in GA, send it
            if (settings.enableGaEvent) {
                if (settings.debug) {
                    console.log("send cancel event");
                }
                if (typeof ga != "undefined") {
                    ga('send', 'event', settings.gaEventCategory, settings.gaEventActionCancel, settings.gaEventLabel);
                }
            }
        });

        /**
        * Fonction de suivi des clics sur des liens sortants dans Google Analytics
        * Cette fonction utilise une chaîne d'URL valide comme argument et se sert de cette chaîne d'URL
        * comme libellé d'événement. Configurer la méthode de transport sur 'beacon' permet d'envoyer le clic
        * au moyen de 'navigator.sendBeacon' dans les navigateurs compatibles.
        */
        var trackSubmit = function(category, action, label, url) {
           ga('send', 'event', category, action, label, {
             'transport': 'beacon',
             'hitCallback': function(){document.location = url;}
           });
        }
    };
})(jQuery);
