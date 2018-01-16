const router = require('express').Router()
const multer = require('multer')
const style = require('./controllers/style')
const tileset = require('./controllers/tileset')
const font = require('./controllers/font')
const sprite = require('./controllers/sprite')

const upload = multer({
  dest: './data/uploads/',
  limits: { fileSize: 200000000, files: 1 }
})

// Style API
router.get('/styles', style.list)
router.get('/styles/:styleId', style.get)
router.put('/styles/:styleId', style.replace)
router.delete('/styles/:styleId', style.delete)

// Tileset API
router.get('/tilesets', tileset.list)
router.get('/tilesets/:tilesetId/tilejson', tileset.getTileJSON)
router.get('/tilesets/:tilesetId/:z(\\d+)/:x(\\d+)/:y(\\d+).:format([\\w\\.]+)', tileset.getTile)

// Font API
router.get('/fonts', font.list)
router.get('/fonts/:fontstack/:start(\\d+)-:end(\\d+).pbf', font.getGlyphs)

// Sprite API
router.get('/sprites', sprite.list)
router.put('/sprites/:spriteId', sprite.replace)
router.delete('/sprites/:spriteId', sprite.delete)
router.get('/sprites/:spriteId/icons/:icon', sprite.getIcon)
router.put('/sprites/:spriteId/icons/:icon', upload.any(), sprite.replaceIcon)
router.delete('/sprites/:spriteId/icons/:icon', sprite.deleteIcon)
router.get('/sprites/:spriteId/sprite:scale(@[1-4]x)?.:format(png|json)?', sprite.getSprite)

module.exports = router
