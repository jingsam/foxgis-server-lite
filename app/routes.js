const router = require('express').Router()
const styles = require('./services/styles')
const tilesets = require('./services/tilesets')
const sprites = require('./services/sprites')
const fonts = require('./services/fonts')

router.use(styles)
router.use(tilesets)
router.use(sprites)
router.use(fonts)

module.exports = router
