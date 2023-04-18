

<div align="center">  
  <h1>nosdav-cli</h1>
</div>

<div align="center">  
<i>nosdav-cli</i>
</div>

---

<div align="center">
<h4>Documentation</h4>
</div>

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nosdav/nosdav-cli/blob/gh-pages/LICENSE)
[![npm](https://img.shields.io/npm/v/nosdav-cli)](https://npmjs.com/package/nosdav-cli)
[![npm](https://img.shields.io/npm/dw/nosdav-cli.svg)](https://npmjs.com/package/nosdav-cli)
[![Github Stars](https://img.shields.io/github/stars/nosdav/nosdav-cli.svg)](https://github.com/nosdav/nosdav-cli/)

## Introduction

nosdav-cli is a set of scripts that can be used with nostr and nosdav on the command line

## send.js

send.js sends events to a server using the Nostr protocol. 

The code initializes an event object and signs it using a private key, then sends the signed event to a Nostr server using a WebSocket connection. 

If the server accepts the event, a message is logged to the console. The script then waits for 500 milliseconds before closing the WebSocket connection. 

This script can be used as a starting point for building more complex applications that use the Nostr protocol for secure communication.

Usage
Sending an Event

To send an event to a Nostr relay, run the send.js script. The script accepts the following command-line options:

    -u <url>: The URL to include in the event (required).
    -k <private_key>: Your private key (required).
    -r <relay>: The Nostr relay URL (optional, defaults to wss://nostr-pub.wellorder.net).


## put.js

Uploading a File

To upload a file to a NoSDAV server, run the put.js script. The script accepts the following command-line options:

    -f <file_path>: The path to the file you want to upload (required).
    -k <private_key>: Your private key (optional, defaults to a sample private key).
    -s <server>: The NoSDAV server URL (optional, defaults to https://example-nosdav-server.com).



## License

- MIT
