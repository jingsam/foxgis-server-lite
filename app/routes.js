const express = require('express')
const styles = require('./services/styles')
const tilesets = require('./services/tilesets')
const sprites = require('./services/sprites')
const fonts = require('./services/fonts')

const router = express.Router()

router.use(styles)
router.use(tilesets)
router.use(sprites)
router.use(fonts)
router.use('/foxgis-server-assets', express.static(`${__dirname}/assets`))

module.exports = router
