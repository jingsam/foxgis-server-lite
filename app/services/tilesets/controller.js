const fs = require('fs')
const path = require('path')
const MBTiles = require('@mapbox/mbtiles')
const consolidate = require('consolidate')

module.exports.list = (req, res, next) => {
  const tilesetsDir = path.resolve(`./data/tilesets`)

  fs.readdir(tilesetsDir, (err, files) => {
    if (err) return next(err)

    const tilesets = files
      .filter(file => path.extname(file) === '.mbtiles')
      .map(file => path.parse(file).name)

    res.json(tilesets)
  })
}

module.exports.getTilejson = (req, res, next) => {
  const { tilesetId } = req.params
  const tilesetsDir = path.resolve(`./data/tilesets`)
  const source = `mbtiles://${tilesetsDir}/${tilesetId}.mbtiles?mode=ro`

  new MBTiles(source, (err, source) => {
    if (err) return next(err)

    source.getInfo((err, info) => {
      source.close()
      if (err) return next(err)

      const apiBaseUrl = `${req.protocol}://${req.headers.host}/api`
      info.tiles = info.tiles || [`${apiBaseUrl}/tilesets/${tilesetId}/{z}/{x}/{y}.${info.format}`]
      info.type = ['pbf', 'mvt'].includes(info.format) ? 'vector' : 'raster'

      res.json(info)
    })
  })
}

module.exports.getHtml = (req, res, next) => {
  const { tilesetId } = req.params

  consolidate.ejs(path.join(__dirname, './template.html'), { tilesetId }, (err, html) => {
    if (err) return next(err)

    res.send(html)
  })
}

module.exports.getTile = (req, res, next) => {
  const { tilesetId, z, x, y } = req.params
  const tilesetsDir = path.resolve(`./data/tilesets`)
  const source = `mbtiles://${tilesetsDir}/${tilesetId}.mbtiles?mode=ro`

  new MBTiles(source, (err, source) => {
    if (err) return next(err)

    source.getTile(+z, +x, +y, (err, data, headers) => {
      source.close()
      if (err && err.message.match(/(Tile|Grid) does not exist/)) return res.sendStatus(404)
      if (err) return next(err)
      if (!data) return res.sendStatus(204)

      delete headers['ETag']
      res.set(headers).send(data)
    })
  })
}
