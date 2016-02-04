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
            var bForm = '<form id="jsb" action="'+settings.formAction+'" class="'+settings.formClass+'" method="POST">';
            var bEmail = '<input type="text" id="'+settings.emailId+'" name="'+settings.emailName+'" placeholder="'+settings.emailPlaceholder+'" class="'+settings.emailClass+'">';
            var bSubmit = '<input id="jsbSubscribe" type="button" value="'+settings.submitLabel+'" class="'+settings.submitClass+'">';
            $(settings.element).prepend('<div id="subscribe-bar" class="fixed">'+bMsg+bForm+bEmail+bSubmit+'</form><a href="#" class="jsb-close"></a></div>');
            return true;
        }

        function removeBar() {
            $('#subscribe-bar').hide(0,function(){$('#subscribe-bar').remove();});
        }

        /**
         * remove error effect on email field
         */
        var emailElt = $("#"+settings.emailId);
        emailElt.keypress(function() {
            if (emailElt.hasClass('input-error')) {
                emailElt.removeClass('input-error');
            }
        });

        /**
         * quick email validation.
         *
         * taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
         */
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        /**
         * click on the submit button
         */
        $("#jsbSubscribe").on('click', function(e){
            // Check email value
            var emailElt = $('#'+settings.emailId);
            var emailValue = emailElt.val();
            if (! validateEmail(emailValue)) {
                emailElt.focus();
                emailElt.addClass('input-error');
                return false;
            };

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

        /**
         * Closing the subscribing bar
         */
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
         * If you want to track outgoing link with Google Analytics.
         * Event is sent with the beacon option through 'navigator.sendBeacon' for compatible browsers.
         */
        var trackSubmit = function(category, action, label, url) {
           ga('send', 'event', category, action, label, {
             'transport': 'beacon',
             'hitCallback': function(){document.location = url;}
           });
        }

        /**
         * Manage a smooth scroll when switching from relative to fixed bar.
         */

        // get header height (without border)
        var getHeaderHeight = $('#subscribe-bar').outerHeight();

        // border height value (make sure to be the same as in your css)
        var borderAmount = 0;

        // shadow radius number (make sure to be the same as in your css)
        var shadowAmount = 30;

        // init variable for last scroll position
        var lastScrollPosition = 0;

        // set negative top position to create the animated header effect
        $('#subscribe-bar').css('top', '-' + (getHeaderHeight + shadowAmount + borderAmount) + 'px');

        $(window).scroll(function() {
            var currentScrollPosition = $(window).scrollTop();

            if ($(window).scrollTop() > 2 * (getHeaderHeight + shadowAmount + borderAmount) ) {

                $('body').addClass('scrollActive').css('padding-top', getHeaderHeight);
                $('#subscribe-bar').css('top', 0);

                if (currentScrollPosition < lastScrollPosition) {
                    $('#subscribe-bar').css('top', '-' + (getHeaderHeight + shadowAmount + borderAmount) + 'px');
                }
                lastScrollPosition = currentScrollPosition;

            } else {
                $('body').removeClass('scrollActive').css('padding-top', 0);
            }
        });
    };
})(jQuery);
