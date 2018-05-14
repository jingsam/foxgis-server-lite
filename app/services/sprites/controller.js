const fs = require('fs')
const path = require('path')
const async = require('async')
const rd = require('rd')
const spritezero = require('@mapbox/spritezero')

module.exports.list = (req, res, next) => {
  const { owner } = req.params
  const spritesDir = path.resolve(`./data/${owner}/sprites`)

  fs.readdir(spritesDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.stat(path.join(spritesDir, file), (err, stats) => {
          if (process.env.NODE_ENV === 'development' && err) return reject(err)
          if (stats.isDirectory()) return resolve(file)

          resolve()
        })
      })
    })

    Promise.all(promises)
      .then(spriteIds => {
        const sprites = spriteIds.filter(Boolean).map(spriteId => {
          return { spriteId, owner }
        })

        res.json(sprites)
      })
      .catch(err => {
        next(err)
      })
  })
}

module.exports.getSprite = (req, res, next) => {
  const { owner, spriteId, scale = '@1x', format = 'json' } = req.params
  const pixelRatio = +scale.slice(1, -1)
  const spriteDir = path.resolve(`./data/${owner}/sprites/${spriteId}`)

  // prettier-ignore
  async.autoInject({
    files: callback => {
      rd.readFileFilter(spriteDir, /\.svg$/, callback)
    },

    imgs: ['files', (files, callback) => {
      async.map(files, (file, cb) => {
        fs.readFile(file, (err, buffer) => {
          if (err) return cb(err)
          cb(null, { id: path.parse(file).name, svg: buffer})
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
    }
  )
}
