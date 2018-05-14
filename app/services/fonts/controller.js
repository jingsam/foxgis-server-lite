const fs = require('fs')
const path = require('path')
const glyphPbfComposite = require('@mapbox/glyph-pbf-composite')

module.exports.list = (req, res, next) => {
  const { owner } = req.params
  const fontsDir = path.resolve(`./data/${owner}/fonts`)

  fs.readdir(fontsDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.stat(path.join(fontsDir, file), (err, stats) => {
          if (process.env.NODE_ENV === 'development' && err) return reject(err)
          if (stats.isDirectory()) return resolve(file)

          resolve()
        })
      })
    })

    Promise.all(promises)
      .then(fontnames => {
        const fonts = fontnames.filter(Boolean).map(fontname => {
          return { fontname, owner }
        })

        res.json(fonts)
      })
      .catch(err => {
        next(err)
      })
  })
}

module.exports.getGlyphs = (req, res, next) => {
  const { owner, fontstack, start, end } = req.params
  const fontPaths = fontstack.split(',').map(fontname => {
    return path.resolve(
      `./data/${owner}/fonts/${fontname.trim()}/${start}-${end}.pbf`
    )
  })

  const promises = fontPaths.map(fontPath => {
    return new Promise((resolve, reject) => {
      fs.readFile(fontPath, (err, font) => {
        if (err && err.code === 'ENOENT') return resolve()
        if (process.env.NODE_ENV === 'development' && err) return reject(err)

        resolve(font)
      })
    })
  })

  Promise.all(promises)
    .then(fonts => {
      const glyphs = fonts.filter(font => font && font.length > 0)
      if (glyphs.length === 0) return res.sendStatus(404)

      res.set('Content-Type', 'application/x-protobuf')
      res.send(glyphPbfComposite.combine(glyphs))
    })
    .catch(err => {
      next(err)
    })
}
