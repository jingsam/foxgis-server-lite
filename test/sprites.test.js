const test = require('tape')
const fs = require('fs')
const path = require('path')
const app = require('../app')
const request = require('supertest')(app)

test('Sprites API tests', t => {
  t.test('List sprites', t => {
    request
      .get('/api/sprites')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.find(spriteId => spriteId === 'streets'))

        t.end()
      })
  })

  t.test('Get a sprite json', t => {
    request
      .get('/api/sprites/streets/sprite.json')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.deepEqual(res.body, require('./expected/sprite.json'))

        t.end()
      })
  })

  t.test('Get a sprite png', t => {
    request
      .get('/api/sprites/streets/sprite.png')
      .expect(200)
      .expect('Content-Type', 'image/png')
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.equals(fs.readFileSync(path.join(__dirname, './expected/sprite.png'))))

        t.end()
      })
  })
})

test.onFinish(() => process.exit(0))
