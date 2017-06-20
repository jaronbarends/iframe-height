/*
 * handle message events sent by iframeMessagePoster.js which is included in connexys' iframe
 */
 ;(function($) {

    'use strict';


    /**
    * return the closest ancestor that matches a given selector
    * @param {html element} el The element whose ancestors to examine
    * @param {string} s Query selector
    * @returns {html element | null}
    */
    var closest = function(el, s) {
        var matches = document.querySelectorAll(s),
            i;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement)); 
        return el;
    };
    


    /**
    * check if this iframe has a parent which matches the ignoreIframesWithParentSelector
    * @param {html element} iframe The iframe whose ancestors to examing
    * @returns {boolean}
    */
    var hasIgnoredParent = function(iframe) {
        var match = false;
        if (ignoreIframesWithParentSelector) {
            match = (closest(iframe, ignoreIframesWithParentSelector) !== null);
        }
        return match;
    };


    /**
    * handle a post message event
    * @param {event} e The message event sent by a descendant iframe
    * @returns {undefined}
    */
    var handleMessage = function(e) {
        var data = e.data,
            height = data.height + 'px';

        if (data.messengerId === 'iframeResizer') {

            var iframes = document.getElementsByTagName('iframe');
            for (var i=0, len=iframes.length; i<len; i++) {
                var iframe = iframes[i],
                    srcMatch;

                if (!hasIgnoredParent(iframe)) {
                    srcMatch = (e.data.url === iframe.src);

                    if (srcMatch) {
                        iframe.style.height = height;
                    }
                }
             };
        }
        
    };

    var ignoreIframesWithParentSelector = '.hero';
    window.addEventListener('message', handleMessage);

})();