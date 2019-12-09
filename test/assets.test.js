const test = require('tape')
const fs = require('fs')
const path = require('path')
const app = require('../app')
const request = require('supertest')(app)

test('Assets API tests', t => {
  t.test('Get asset', t => {
    request
      .get('/api/assets/mapbox-gl.js')
      .expect(200)
      .end(t.end)
  })
})

test.onFinish(() => process.exit(0))
