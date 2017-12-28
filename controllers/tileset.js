const path = require('path')
const MBTiles = require('@mapbox/mbtiles')


module.exports.getTileJSON = (req, res, next) => {
  const { tilesetId } = req.params
  const tilesetPath = path.resolve(`./data/tilesets/${tilesetId}.mbtiles`)

  new MBTiles(tilesetPath, (err, source) => {
    if (err) return next(err)

    source.getInfo((err, info) => {
      source.close()

      if (err) return next(err)

      const endpoint = `${req.protocol}://${req.headers.host}/api/v1`
      info.tiles = [`${endpoint}/tilesets/${tilesetId}/{z}/{x}/{y}.${info.format}`]
      info.scheme = 'xyz'

      res.json(info)
    })
  })
}


module.exports.getTile = (req, res, next) => {
  const { tilesetId, z, x, y } = req.params
  const tilesetPath = path.resolve(`./data/tilesets/${tilesetId}.mbtiles`)

  new MBTiles(tilesetPath, (err, source) => {
    if (err) return next(err)

    source.getTile(+z, +x, +y, (err, data, headers) => {
      source.close()

      if (err) return next(err)
      if (!data) return res.sendStatus(404)

      delete headers['ETag']

      res.set(headers)
      res.send(data)
    })
  })
}
