const router = require('express').Router()
const controller = require('./controller')

router.get('/fonts/:owner', controller.list)
router.get('/fonts/:owner/:fontstack/:start(\\d+)-:end(\\d+).pbf', controller.getGlyphs) // prettier-ignore

module.exports = router
