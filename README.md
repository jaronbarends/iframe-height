# iframe-resizer

## Description
When you have an iframe on a different domain, this script will resize the iframe in the parent-page to adapt its height to the iframe's source's content

This won't work in every situation: you will need be able to include a script into the iframe you're embedding.

## Instruction
in the parent document, include _iframeMessageReceiver.js_
in the iframe's source document, include _iframeMessagePoster.js_

When testing locally, you'll need to view the pages through a webserver.
