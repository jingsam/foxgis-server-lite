const router = require('express').Router()
const controller = require('./controller')

router.get('/sprites/:owner', controller.list)
router.get('/sprites/:owner/:spriteId/sprite:scale(@[1-4]x)?.:format(png|json)?', controller.getSprite) // prettier-ignore

module.exports = router
