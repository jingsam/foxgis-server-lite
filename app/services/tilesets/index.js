const router = require('express').Router()
const tilesets = require('./controller')

router.get('/tilesets', tilesets.list)
router.get('/tilesets/:tilesetId/tilejson', tilesets.getTilejson)
router.get('/tilesets/:tilesetId/html', tilesets.getHtml)
router.get('/tilesets/:tilesetId/:z(\\d+)/:x(\\d+)/:y(\\d+).:format([\\w\\.]+)',tilesets.getTile)

module.exports = router
