const fs = require('fs')
const path = require('path')
const async = require('async')
const rd = require('rd')
const mkdirp = require('mkdirp')
const spritezero = require('@mapbox/spritezero')


module.exports.list = (req, res, next) => {
  const spritesDir = path.resolve('./data/sprites')

  fs.readdir(spritesDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.stat(path.join(spritesDir, file), (err, stats) => {
          if (stats.isDirectory()) return resolve(file)

          return resolve()
        })
      })
    })

    Promise.all(promises).then(results => {
      res.json(results.filter(result => result))
    })
  })
}


module.exports.replace = (req, res, next) => {
  const { spriteId } = req.params
  const spriteDir = path.resolve(`./data/sprites/${spriteId}`)

  mkdirp(spriteDir, err => {
    if (err) return next(err)

    res.json(spriteId)
  })
}


module.exports.delete = (req, res, next) => {
  const { spriteId } = req.params
  const spriteDir = path.resolve(`./data/sprites/${spriteId}`)

  fs.rmdir(spriteDir, err => {
    if (err && err.code !== 'ENOENT') return next(err)

    res.sendStatus(204)
  })
}


module.exports.getIcon = (req, res, next) => {
  const { spriteId, icon } = req.params
  const iconPath = path.resolve(`./data/sprites/${spriteId}/${icon}.svg`)

  res.sendFile(iconPath, err => {
    if (err && err.code === 'ENOENT') return res.sendStatus(404)
    if (err) return next(err)
  })
}


module.exports.replaceIcon = (req, res, next) => {
  const { spriteId, icon } = req.params
  const iconPath = path.resolve(`./data/sprites/${spriteId}/${icon}.svg`)
  const { path: filePath, originalname } = req.files[0]

  if (path.extname(originalname) !== '.svg') {
    fs.unlink(filePath)
    return next({ status: 400, message: 'Only support svg icons.' })
  }

  fs.rename(filePath, iconPath, err => {
    if (err) return next(err)

    res.sendStatus(204)
  })

}


module.exports.deleteIcon = (req, res, next) => {
  const { spriteId, icon } = req.params
  const iconPath = path.resolve(`./data/sprites/${spriteId}/${icon}.svg`)

  fs.unlink(iconPath, err => {
    if (err && err.code !== 'ENOENT') return next(err)

    res.sendStatus(204)
  })
}


module.exports.getSprite = (req, res, next) => {
  const { spriteId, scale = '@1x', format = 'json' } = req.params
  const pixelRatio = +scale.slice(1, -1)
  const spriteDir = path.resolve(`./data/sprites/${spriteId}`)

  async.autoInject({
    files: callback => {
      rd.readFileFilter(spriteDir, /\.svg$/, callback)
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
