const test = require('tape')
const fs = require('fs')
const path = require('path')
const app = require('../app')
const request = require('supertest')(app)

test('Fonts API tests', t => {
  t.test('List fonts', t => {
    request
      .get('/api/fonts')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.find(fontId => fontId === 'Arial Unicode MS Regular'))

        t.end()
      })
  })

  t.test('Get glyphs', t => {
    request
      .get('/api/fonts/NonExistentFont,Arial Unicode MS Regular/0-255.pbf')
      .responseType('blob')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.equals(fs.readFileSync(path.join(__dirname, './expected/0-255.pbf'))))

        t.end()
      })
  })
})

test.onFinish(() => process.exit(0))
