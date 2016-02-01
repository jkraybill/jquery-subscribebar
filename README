# jquery subscribeBar

SubscribeBar is a simple jquery plugin to display a bar to invite users to subscribe to your newsletter.

## How it works

Download jquery.subscribebar.js and add it to your page :

```
<script type="text/javascript" src="jquery.subscribebar.js"></script>
```

subscribeBar is using jquery and jquery-cookie, you need to include these librairies before subscribeBar :

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
```

And then call subscribeBar to show your bar or not :

```
<script type="text/javascript">
    $(document).ready(function(){
        $.subscribeBar();
    });
</script>
```

## Customize subscribeBar

You can set different things when using subscribeBar.
Here are the default values :

* checkAcceptCookie: false
  * check if an "accept cookie" cookie exists
* acceptCookieName: 'accept_cookie'
  * the name of the "accept cookie"
* acceptCookieValue: 1
  * the value we should find to be able to show our bar
* debug: false
  * show some debug through console.log()
* element: 'body'
  * where to inject our html through  $(settings.element).append()
* emailClass: ""
  * extra css class added to the email input field
* emailPlaceholder: "email adress"
  * email input field placeholder
* emailId: 'email'
  * html id of the email input field
* emailName: 'email'
  * html name of the email input field
* enableGaEvent: false
  * allow GA events. Send events when user is interacting with the bar
* formAction: "#"
  * where to submit the email address
* formClass: ""
  * extra css class added to the form
* gaEventCategory: "CTA"
  * GA event category value
* gaEventAction: "subscribe to newsletter"
  * GA event action value when subscribing
* gaEventActionCancel: "close subscribe bar"
  * GA event action value when closing the bar
* gaEventLabel: "top subscribe bar"
  * GA event label value
* msg: "Stay tuned, subscribe to our newsletter!"
  * text to show in the bar
* msgClass: ""
  * extra css class for the text
* nextShow: 15
  * show the bar again in xx days
* submitClass: ""
  * submit button extra css
* submitLabel: "SUBSCRIBE"
  * submit button label

