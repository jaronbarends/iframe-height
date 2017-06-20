/*
 * iframeMessagePoster
 * included in iframe page; posts messages to its parent page about its height
 * that way, the script iframeMessageReceiver in the parent document can adjust the iframe's height
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:4, maxerr:50, smarttabs:true */
;(function () {

    'use strict';

    var resizeTimer,
        messengerId = 'iframeResizer';// id to pass with post message



    /**
    * post a message to the parent frame with this script's id
    * @param {object} messageObj Object {height}
    * @returns {undefined}
    */
    var postTheMessage = function (messageObj) {
        messageObj.messengerId = messengerId;
        window.parent.postMessage(messageObj, '*');
    };


    /**
    * post a message to the iframe's parent with an id to identify the postMessage
    * and the iFrame's url so we know which iframe to target
    * @param {number} height The height of the iframe's content
    * @returns {undefined}
    */
    var postHeightMessage = function(height) {
        var iframeUrl = window.location.href;

        var messageObj = {
            messengerId: messengerId,
            height: height,
            url: iframeUrl
        };
        window.parent.postMessage(messageObj, '*');
    };
    



    /**
    * adjust the height of the document to make all objects fit within
    * @returns {undefined}
    */
    var adjustDocumentHeight = function () {
        setHeight();
        setTimeout(setHeight, 200); // do once more for no scrollbar fix
    };



    /**
    * set the height of the document
    * @returns {undefined}
    */
    var setHeight = function () {
        // temporarily remove resize listener - we're going to resize the document ourselves
        removeResizeListener();
        
        var nodes = document.body.childNodes,
            height = 0;

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.nodeType === 1) {// element
                var pos = window.getComputedStyle(node).position;

                if (pos !== 'absolute' && pos !== 'fixed') {
                    // only count elements that are in normal document flow
                    if (node.scrollHeight) {
                        height += node.scrollHeight;
                    } else if (node.offsetHeight) {
                        height += node.offsetHeight;
                    }
                }
            }
        }

        // when resizing, sometimes the page comes to a point were the scrollbar 
        // "stutters" between getting removed and added.
        // if you can, set the iframe's body to overflow: hidden;
        // otherwise, adding 50px here prevents that, too.
        // height += 50;

        postHeightMessage(height);

        // re-add the resize listener
        addResizeListener();
    };



    /**
    * upon resize, set timeout to adjust height when resizing has stopped for 10 ms
    * @returns {undefined}
    */
    var resizeHandler = function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustDocumentHeight, 50);
    };



    /**
    * remove the resize listener
    * @returns {undefined}
    */
    var removeResizeListener = function() {
        window.removeEventListener('resize', resizeHandler, false);
    };
    


    /**
    * add resize listener - to prevent infinite loops,
    // we'll have to remove resize listener when this script is resizing the document
    * @returns {undefined}
    */
    var addResizeListener = function() {
        window.addEventListener('resize', resizeHandler, false);
    };
    


    /**
    * initialize script - set resize event listener and call resize for first time
    * @returns {undefined}
    */
    var init = function() {
        addResizeListener();
        resizeHandler();

        setTimeout(resizeHandler, 1000);// call it once more, in case the iframe was loaded before the message-listener was added in the parent document
    };
    


    // when all content is loaded, kick script off
    document.addEventListener('DOMContentLoaded', init);
    
})();