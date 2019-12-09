const express = require('express')
const styles = require('./styles')
const tilesets = require('./tilesets')
const sprites = require('./sprites')
const fonts = require('./fonts')
const assets = require('./assets')

const router = express.Router()

router.use(styles)
router.use(tilesets)
router.use(sprites)
router.use(fonts)
router.use(assets)

module.exports = router
