const test = require('tape')
const app = require('../app')
const request = require('supertest')(app)

test('Styles API tests', t => {
  t.test('List styles', t => {
    request
      .get('/api/styles')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.find(styleId => styleId === 'world'))

        t.end()
      })
  })

  t.test('Get a style', t => {
    request
      .get('/api/styles/world')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.deepEqual(res.body, require('./expected/world.json'))

        t.end()
      })
  })

  t.test('Get html', t => {
    request.get('/api/styles/world/html')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(t.end)
  })
})

test.onFinish(() => process.exit(0))
