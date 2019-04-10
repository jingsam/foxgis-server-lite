const router = require('express').Router()
const sprites = require('./controller')

router.get('/sprites', sprites.list)
router.get('/sprites/:spriteId/sprite:scale(@[1-4]x)?.:format(png|json)?', sprites.getSprite) // prettier-ignore

module.exports = router
