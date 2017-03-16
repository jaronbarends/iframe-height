/*
 * handle message events sent by iframeMessagePoster.js which is included in other party's iframe
 */
 ;(function($) {

	'use strict';

	/**
	* return domain without http or https
	* @param {string} url The url to whose domain to return
	* @returns {undefined}
	*/
	var getDomainWithoutProtocol = function(url) {
		var marker = '://',
			pos = url.indexOf(marker);
		if (pos > -1) {
			url = url.substring(pos + marker.length);
		}

		return url;
	};

	/**
	* return domain without http or https
	* @param {string} url The url to whose domain to return
	* @returns {undefined}
	*/
	var getDomainWithoutProtocol_ = function(url) {
		var http = 'http://',
			https = 'https://';
		if (url.indexOf(http) > -1) {
			url = url.substring(http.length-1);
		} else if (url.indexOf(https) > -1) {
			url = url.substring(https.length-1);
		}

		return url;
	};


	/**
	* handle incoming postMessage
	* @param {jQuery event} jqE The message-event
	* @returns {undefined}
	*/
	var messageHandler = function(jqE) {

		var e = jqE.originalEvent;

		if (e.data.indexOf('SizeHeight') === 0) {

			$('iframe').each(function() {
				var iframe = this,
					iframeSrcNoProtocol = getDomainWithoutProtocol(iframe.src),
					eventOriginNoProtocol = getDomainWithoutProtocol(e.origin);

				// check if the iframe is on the same domain as where the message was sent from
				// to prevent unwanted scaling of addthis iframes and the like
				// sometimes origin only contains the domain, not the entire url
				// and we have had problems with incorrect http/https combinations
				// so only check origin without protocol
				if (iframeSrcNoProtocol.indexOf(eventOriginNoProtocol) > -1) {
					var height = e.data.substring(11) + 'px';
					 $(iframe).css('height', height);
				}
			});

		}
	};
	
	// set listener for incoming postMessage
	$(window).on('message', messageHandler);

})(jQuery);