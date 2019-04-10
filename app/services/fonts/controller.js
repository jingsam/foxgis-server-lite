const fs = require('fs')
const path = require('path')
const glyphPbfComposite = require('@mapbox/glyph-pbf-composite')

module.exports.list = (req, res, next) => {
  const fontsDir = path.resolve(`./data/fonts`)

  fs.readdir(fontsDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.stat(path.join(fontsDir, file), (err, stats) => {
          if (err || !stats.isDirectory()) return resolve(null)

          resolve(file)
        })
      })
    })

    Promise.all(promises)
      .then(fontIds => {
        const fonts = fontIds.filter(Boolean)

        res.json(fonts)
      })
      .catch(err => {
        next(err)
      })
  })
}

module.exports.getGlyphs = (req, res, next) => {
  const { start, end } = req.params
  const fontIds = req.params.fontIds.split(',').map(fontId => fontId.trim())
  const fontsDir = path.resolve(`./data/fonts`)
  const glyphPaths = fontIds.map(fontId => `${fontsDir}/${fontId}/${start}-${end}.pbf`)

  const promises = glyphPaths.map(glyphPath => {
    return new Promise((resolve, reject) => {
      fs.readFile(glyphPath, (err, buffer) => {
        if (err) return resolve()

        resolve(buffer)
      })
    })
  })

  Promise.all(promises)
    .then(buffers => {
      const glyphs = buffers.filter(buffer => buffer && buffer.length > 0)
      if (glyphs.length === 0) return res.sendStatus(404)

      res.set('Content-Type', 'application/x-protobuf')
      res.send(glyphPbfComposite.combine(glyphs))
    })
    .catch(err => {
      next(err)
    })
}
