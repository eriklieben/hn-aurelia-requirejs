'use strict'

const path = require('path');
const express = require('express');
const firebase = require('firebase');
const hackernews = require('firebase-hackernews');

const server = express()
const hnservice = hackernews.init(firebase, {
  log: console.log
})
const watchmode = process.argv.includes('--watch')

server.get('/hackernews/*', (req, res) => {
  hnservice.fetch(req.path)
    .then(data => {
      res.send(typeof data === "number" ? String(data) : data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err.toString())
    })
})

Promise.resolve(watchmode && hnservice.watch()).then(() => {
  const PORT = 3001
  server.listen(PORT, () => {
    console.log(`server has started with ${watchmode ? 'watch' : 'fetch'} mode.` +
      ` visit to http://localhost:${PORT}`)
  })
})