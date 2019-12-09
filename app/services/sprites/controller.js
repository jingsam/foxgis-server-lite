const fs = require('fs')
const path = require('path')

module.exports.list = (req, res, next) => {
  const spritesDir = path.resolve(`./data/sprites`)

  fs.readdir(spritesDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise(resolve => {
        fs.stat(path.join(spritesDir, file), (err, stats) => {
          if (err || !stats.isDirectory()) return resolve()

          resolve(file)
        })
      })
    })

    Promise.all(promises)
      .then(spriteIds => {
        const sprites = spriteIds.filter(Boolean)

        res.json(sprites)
      })
      .catch(err => {
        next(err)
      })
  })
}

module.exports.getSprite = (req, res, next) => {
  const { spriteId, scale = '', format = 'json' } = req.params
  const spritePath = path.resolve(`./data/sprites/${spriteId}/sprite${scale}.${format}`)

  res.sendFile(spritePath, err => {
    if (err) return next(err)
  })
}
