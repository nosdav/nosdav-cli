#!/usr/bin/env node

// put.js
import fs from 'fs/promises'
import axios from 'axios'
import minimist from 'minimist'
import { createEvent, signEvent } from '../index.js'

const argv = minimist(process.argv.slice(2), {
  alias: {
    f: 'filePath',
    k: 'privateKey',
    s: 'server'
  },
  default: {
    privateKey:
      '5fde1ef2d1026bf2cc8bb78dd3f10003cf250e3ffad1725eb2337b0f036573a1',
    server: 'https://example-nosdav-server.com'
  }
})

const { filePath, privateKey, server } = argv

if (!filePath) {
  console.error('Error: file path is required.')
  process.exit(1)
}

; (async () => {
  try {
    // Read file content
    const fileContent = await fs.readFile(filePath)

    // Create an event
    const event = createEvent(27235, 'u', privateKey)

    // Sign the event
    const signedEvent = signEvent(event, privateKey)

    console.log('Event signed successfully:', event)

    // Encode the signed event as a base64 string
    const base64Event = Buffer.from(JSON.stringify(event)).toString('base64')

    // Prepare headers
    const headers = {
      Authorization: `Nostr ${base64Event}`
    }

    // Send PUT request to the nosdav server
    const response = await axios.put(`${server}/${filePath}`, fileContent, {
      headers: headers
    })

    console.log('File uploaded successfully:', response.status)
  } catch (error) {
    console.error(`Error while uploading file: ${error.message}`)
  }
})()
