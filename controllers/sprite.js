const fs = require('fs')
const path = require('path')
const async = require('async')
const rd = require('rd')
const spritezero = require('@mapbox/spritezero')


module.exports.getSprite = (req, res, next) => {
  const { spriteId, scale = '@1x', format = 'json' } = req.params
  const pixelRatio = +scale.slice(1, -1)
  const spriteDir = path.resolve(`./data/sprites/${spriteId}`)

  async.autoInject({
    files: callback => {
      rd.readFileFilter(spriteDir, /\.svg$/i, callback)
    },

    imgs: ['files', (files, callback) => {
      async.map(files, (file, next) => {
        fs.readFile(file, (err, buffer) => {
          if (err) return next(err)
          next(null, {
            id: path.parse(file).name,
            svg: buffer
          })
        })
      }, callback)
    }],

    sprite: ['imgs', (imgs, callback) => {
      if (format === 'json') {
        spritezero.generateLayout({ imgs, pixelRatio, format: true }, callback)
      } else {
        spritezero.generateLayout({ imgs, pixelRatio, format: false }, (err, layout) => {
          if (err) return callback(err)
          spritezero.generateImage(layout, callback)
        })
      }
    }]
  }, (err, results) => {
    if (err) return next(err)

    res.type(format)
    res.send(results.sprite)
  })
}
