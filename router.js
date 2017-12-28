const router = require('express').Router()
const style = require('./controllers/style')
const tileset = require('./controllers/tileset')
const font = require('./controllers/font')
const sprite = require('./controllers/sprite')

router.get('/styles/:styleId', style.getStyle)

router.get('/tilesets/:tilesetId/tilejson', tileset.getTileJSON)
router.get('/tilesets/:tilesetId/:z(\\d+)/:x(\\d+)/:y(\\d+).:format([\\w\\.]+)', tileset.getTile)

router.get('/fonts/:fontstack/:start(\\d+)-:end(\\d+).pbf', font.getGlyphs)

router.get('/sprites/:spriteId/sprite:scale(@[1-4]x)?.:format(png|json)?', sprite.getSprite)

module.exports = router
