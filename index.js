import 'websocket-polyfill'
import {
  signEvent,
  getEventHash,
  getPublicKey,
  relayInit
} from 'nostr-tools'

/**
  * Creates an event object.
  * @param {string} kind - The kind of the event.
  * @param {string} url - The URL associated with the event.
  * @param {string} privateKey - The private key used to sign the event.
  * @returns {object} The created event object.
  */
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

/**
 * Initializes the relay.
 * @param {string} url - The URL of the relay.
 * @returns {object} The initialized relay object.
 */
export function initializeRelay(url) {
  const relay = relayInit(url)
  return relay
}

/**
 * Sends an event to the relay.
 * @param {object} event - The event object to send.
 * @param {object} relay - The relay object.
 * @returns {Promise<void>} A promise that resolves when the event is sent.
 */
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
