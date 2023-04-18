#!/usr/bin/env node

// Imports
import { createEvent, initializeRelay, sendEventToRelay } from '../index.js'

// Configuration
const privateKey =
  'fcd09d068ce783e4c82f254f04f7371f7004cbdb641436683a6c9bd0cd885419'
const publicRelay = 'wss://nostr-pub.wellorder.net'

  // Main function
  ; (async () => {
    try {
      // Create an event
      const event = createEvent(27235, 'url', privateKey)

      // Initialize a relay
      const relay = await initializeRelay(publicRelay)

      // Send the event to the relay
      await sendEventToRelay(event, relay)

      console.log('Event sent successfully.')
    } catch (error) {
      console.error(`Error while sending event: ${error.message}`)
    }
  })()
