#!/usr/bin/env node

// imports
import { createEvent, initializeRelay, sendEventToRelay } from '../index.js'

// init
const privateKey =
  'fcd09d068ce783e4c82f254f04f7371f7004cbdb641436683a6c9bd0cd885419'
const publicRelay = 'wss://nostr-pub.wellorder.net'

// main
const event = createEvent(27235, 'url', privateKey)
const relay = initializeRelay(publicRelay)

// send
sendEventToRelay(event, relay)
