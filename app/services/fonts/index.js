const router = require('express').Router()
const fonts = require('./controller')

router.get('/fonts', fonts.list)
router.get('/fonts/:fontIds/:start(\\d+)-:end(\\d+).pbf', fonts.getGlyphs)

module.exports = router
