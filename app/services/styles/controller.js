const fs = require('fs')
const path = require('path')

module.exports.list = (req, res, next) => {
  const { owner } = req.params
  const stylesDir = path.resolve(`./data/${owner}/styles`)

  fs.readdir(stylesDir, (err, files) => {
    if (err) return next(err)

    const styles = files
      .filter(file => path.extname(file) === '.json')
      .map(file => {
        return { styleId: path.parse(file).name, owner }
      })

    res.json(styles)
  })
}

module.exports.get = (req, res, next) => {
  const { owner, styleId } = req.params
  const stylePath = path.resolve(`./data/${owner}/styles/${styleId}.json`)

  res.sendFile(stylePath, err => {
    if (err && err.code === 'ENOENT') return res.sendStatus(404)
    if (err) return next(err)
  })
}

module.exports.getHTML = (req, res, next) => {
  const { owner, styleId } = req.params

  const endpoint = `${req.protocol}://${req.headers.host}/api/v1`
  const styleURL = `${endpoint}/styles/${owner}/${styleId}`

  res.render('preview', { styleURL })
}
