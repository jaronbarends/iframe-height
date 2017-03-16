/*
 * iframeMessagePoster
 * included in iframe page; posts messages to its parent page about its height
 * that way, the script iframeMessageReceiver in the parent document can adjust the iframe's height
*/
;(function () {

	'use strict';


	/**
	* determine the document's height and post it to the parent window
	* @returns {undefined}
	*/
	var determineHeight = function() {
		var nodes = document.body.childNodes,
			height = 0,
			magicNumber = 40;// we need to add 40 to the height - I'm not exactly sure why :(

		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.scrollHeight) {
				height += node.scrollHeight;
			} else if (node.offsetHeight) {
				height += node.offsetHeight;
			}
		}

		var msg = 'SizeHeight:' + (height + magicNumber);
		window.parent.postMessage(msg, '*');
	};



	/**
	* check if browser supports onload events, and if so add event listeners
	* @param {function} callback The callback function to call
	* @returns {undefined}
	*/
	var addOnloadEvent = function(callback) {
		if (window.parent.postMessage !== 'undefined') { // will only work in > IE8, > FF3 and Chrome
			if (typeof window.addEventListener !== 'undefined') {
				window.addEventListener('load', callback, false);
			} else if (typeof window.attachEvent !== 'undefined') {
				window.attachEvent('onload', callback);
			}
		}
	};
	


	/**
	* initialize this script
	* @returns {undefined}
	*/
	var init = function() {
		determineHeight();
		setTimeout(determineHeight, 200); // do once more for no scrollbar fix
	};

	// on load, kick off the script
	addOnloadEvent(init);
	
})();