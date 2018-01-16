const fs = require('fs')
const path = require('path')


module.exports.list = (req, res, next) => {
  const stylesDir = path.resolve('./data/styles')

  fs.readdir(stylesDir, (err, files) => {
    if (err) return next(err)

    res.json(files
      .filter(file => path.extname(file) === '.json')
      .map(file => path.parse(file).name)
    )
  })
}


module.exports.get = (req, res, next) => {
  const { styleId } = req.params
  const stylePath = path.resolve(`./data/styles/${styleId}.json`)

  res.sendFile(stylePath, err => {
    if (err && err.code === 'ENOENT') return res.sendStatus(404)
    if (err) return next(err)
  })
}


module.exports.replace = (req, res, next) => {
  const { styleId } = req.params
  const stylePath = path.resolve(`./data/styles/${styleId}.json`)
  const style = req.body

  fs.writeFile(stylePath, style, err => {
    if (err) return next(err)

    res.json(style)
  })
}


module.exports.delete = (req, res, next) => {
  const { styleId } = req.params
  const stylePath = path.resolve(`./data/styles/${styleId}.json`)

  fs.unlink(stylePath, err => {
    if (err && err.code !== 'ENOENT') return next(err)

    res.sendStatus(204)
  })
}
