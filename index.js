import 'websocket-polyfill'
import {
  signEvent,
  getEventHash,
  getPublicKey,
  relayInit
} from 'nostr-tools'

// Function to create an event
export function createEvent(kind, url, privateKey) {
  const event = {
    kind: kind,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['u', url]],
    content: '',
    pubkey: getPublicKey(privateKey)
  }

  event.id = getEventHash(event)
  event.sig = signEvent(event, privateKey)
  return event
}

// Function to initialize the relay
export function initializeRelay(url) {
  const relay = relayInit(url)
  return relay
}

// Function to send an event to the relay
export async function sendEventToRelay(event, relay) {
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })

  console.log(event)

  await relay.connect()

  console.log('publishing')

  const pub = relay.publish(event)

  pub.on('ok', () => {
    console.log(`${relay.url} has accepted our event`)
  })
  pub.on('failed', reason => {
    console.log(`failed to publish to ${relay.url}: ${reason}`)
  })

  setTimeout(() => {
    relay.close()
  }, 500)
}

export { signEvent }
