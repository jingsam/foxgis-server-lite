const fs = require('fs')
const path = require('path')
const MBTiles = require('@mapbox/mbtiles')

module.exports.list = (req, res, next) => {
  const { owner } = req.params
  const tilesetsDir = path.resolve(`./data/${owner}/tilesets`)

  fs.readdir(tilesetsDir, (err, files) => {
    if (err) return next(err)

    const tilesets = files
      .filter(file => path.extname(file) === '.mbtiles')
      .map(file => {
        return { tilesetId: path.parse(file).name, owner }
      })

    res.json(tilesets)
  })
}

module.exports.getTileJSON = (req, res, next) => {
  const { owner, tilesetId } = req.params
  const tilesetPath = path.resolve(
    `./data/${owner}/tilesets/${tilesetId}.mbtiles`
  )

  new MBTiles(tilesetPath, (err, source) => {
    if (err) return next(err)

    source.getInfo((err, info) => {
      source.close()
      if (err) return next(err)

      const endpoint = `${req.protocol}://${req.headers.host}/api/v1`
      info.tiles = [
        `${endpoint}/tilesets/${owner}/${tilesetId}/{z}/{x}/{y}.${info.format}`
      ]
      info.scheme = 'xyz'

      res.json(info)
    })
  })
}

module.exports.getTile = (req, res, next) => {
  const { owner, tilesetId, z, x, y } = req.params
  const tilesetPath = path.resolve(
    `./data/${owner}/tilesets/${tilesetId}.mbtiles`
  )

  new MBTiles(tilesetPath, (err, source) => {
    if (err) return next(err)

    source.getTile(+z, +x, +y, (err, data, headers) => {
      source.close()

      if (err && err.message.match(/(Tile|Grid) does not exist/))
        return res.sendStatus(404)
      if (err) return next(err)
      if (!data) return res.sendStatus(204)

      delete headers['ETag']

      res.set(headers)
      res.send(data)
    })
  })
}
