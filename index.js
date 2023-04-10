import 'websocket-polyfill';
import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
  getPublicKey,
  relayInit,
  generatePrivateKey,
} from 'nostr-tools';

export function createEvent(kind, url, privateKey) {
  let event = {
    kind: kind,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['u', url]],
    content: '',
    pubkey: getPublicKey(privateKey),
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, privateKey);
  return event;
}

export function initializeRelay(url) {
  const relay = relayInit(url);
  return relay;
}

export async function sendEventToRelay(event, relay) {
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

}
