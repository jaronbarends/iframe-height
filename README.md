# iframe-resizer
Vanilla js solution for resizing an iframe in its parent page, based on its content.

## Description

When you have an iframe on a different domain, this script will resize the iframe in the parent-page to adapt its height to the iframe's source's content

This won't work in every situation: you will need be able to include a script into the iframe you're embedding.

## Instruction

in the parent document, include _iframeMessageReceiver.js_
in the iframe's source document, include _iframeMessagePoster.js_

When testing locally, you'll need to view the pages through a webserver.

## How it works

_iframeMessagePoster.js_ calculates the height of all of the body's children that are in the normal flow. It then uses postMessage to send an event to its parent document. In the parent document, _iframeMessageReceiver.js_ listens for the `message` event. It then loops over all iframes, and if the iframe's src corresponds with the iframe that sent the event, it adjusts its `height` property.

## Known issues

Sometimes, the moment the iframe's scrollbar gets removed, words jump to the previous line, causing te scrollbar to reappear and thus getting in an infinite loop. Setting `overflow: hidden;` on the iframe's body fixes that. In case you don't have control over the iframe's css, you can slightly increase the height it posts to its parent.
