#!/usr/bin/env node

const privateKey = 'fcd09d068ce783e4c82f254f04f7371f7004cbdb641436683a6c9bd0cd885419'

import 'websocket-polyfill'
import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  relayInit,
  generatePrivateKey,
} from 'nostr-tools'


let event = {
  kind: 27235,
  created_at: Math.floor(Date.now() / 1000),
  tags: [['u', 'url']],
  content: '',
  pubkey: getPublicKey(privateKey)
}

event.id = getEventHash(event)
event.sig = signEvent(event, privateKey)

const relay = relayInit('wss://nostr-pub.wellorder.net')

console.log(relay)
relay.on('connect', () => {
  console.log(`connected to ${relay.url}`)
})
relay.on('error', () => {
  console.log(`failed to connect to ${relay.url}`)
})

console.log(event)

await relay.connect()

console.log("publishing")

let pub = relay.publish(event)

pub.on('ok', () => {
  console.log(`${relay.url} has accepted our event`)
})
pub.on('failed', reason => {
  console.log(`failed to publish to ${relay.url}: ${reason}`)
})

setTimeout(() => {
  relay.close()
}, 500)
