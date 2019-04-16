const test = require('tape')
const fs = require('fs')
const path = require('path')
const app = require('../app')
const request = require('supertest')(app)

test('Tilesets API tests', t => {
  t.test('List tilesets', t => {
    request
      .get('/api/tilesets')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.find(tilesetId => tilesetId === 'admin'))

        t.end()
      })
  })

  t.test('Get tileJSON', t => {
    request
      .get('/api/tilesets/admin/tilejson')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.tiles.length)
        t.deepEqual(res.body.id, require('./expected/tilejson.json').id)
        t.deepEqual(res.body.scheme, require('./expected/tilejson.json').scheme)
        t.deepEqual(res.body.vector_layers, require('./expected/tilejson.json').vector_layers)

        t.end()
      })
  })

  t.test('Get html', t => {
    request.get('/api/tilesets/admin/html')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(t.end)
  })

  t.test('Get tile', t => {
    request
      .get('/api/tilesets/admin/1/0/0.pbf')
      .responseType('blob')
      .expect(200)
      .end((err, res) => {
        t.error(err)

        t.ok(res.body.equals(fs.readFileSync(path.join(__dirname, './expected/0.pbf'))))

        t.end()
      })
  })
})

test.onFinish(() => process.exit(0))
