const router = require('express').Router()
const controller = require('./controller')

router.get('/tilesets/:owner', controller.list)
router.get('/tilesets/:owner/:tilesetId/tilejson', controller.getTileJSON)
router.get('/tilesets/:owner/:tilesetId/:z(\\d+)/:x(\\d+)/:y(\\d+).:format([\\w\\.]+)',controller.getTile) // prettier-ignore

module.exports = router
