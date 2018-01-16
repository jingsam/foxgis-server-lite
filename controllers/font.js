const fs = require('fs')
const path = require('path')
const glyphPbfComposite = require('@mapbox/glyph-pbf-composite')


module.exports.list = (req, res, next) => {
  const fontsDir = path.resolve('./data/fonts')

  fs.readdir(fontsDir, (err, files) => {
    if (err) return next(err)

    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.stat(path.join(fontsDir, file), (err, stats) => {
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


module.exports.getGlyphs = (req, res, next) => {
  const { fontstack, start, end } = req.params
  const fontPaths = fontstack.split(',').map(fontname => {
    return path.resolve(`./data/fonts/${fontname.trim()}/${start}-${end}.pbf`)
  })

  const promises = fontPaths.map(fontPath => {
    return new Promise((resolve, reject) => {
      fs.readFile(fontPath, (err, data) => {
        if (err && err.code === 'ENOENT') return resolve(null)
        if (err) return reject(err)

        resolve(data)
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
