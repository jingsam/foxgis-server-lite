const fs = require('fs')
const path = require('path')

module.exports.list = (req, res, next) => {
  const stylesDir = path.resolve(`./data/styles`)

  fs.readdir(stylesDir, (err, files) => {
    if (err) return next(err)

    const styles = files
      .filter(file => path.extname(file) === '.json')
      .map(file => path.parse(file).name)

    res.json(styles)
  })
}

module.exports.get = (req, res, next) => {
  const { styleId } = req.params
  const stylePath = path.resolve(`./data/styles/${styleId}.json`)

  res.sendFile(stylePath, err => {
    if (err) return next(err)
  })
}

module.exports.getHtml = (req, res, next) => {
  const { styleId } = req.params

  consolidate.ejs(path.join(__dirname, './template.html'), { styleId }, (err, html) => {
    if (err) return next(err)

    res.send(html)
  })
}
