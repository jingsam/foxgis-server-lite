const fs = require('fs')
const path = require('path')


module.exports.getStyle = (req, res, next) => {
  const { styleId } = req.params
  const stylePath = path.resolve(`./data/styles/${styleId}.json`)

  res.sendFile(stylePath, err => {
    if (err && err.code === 'ENOENT') return res.sendStatus(404)
    if (err) return next(err)
  })
}
