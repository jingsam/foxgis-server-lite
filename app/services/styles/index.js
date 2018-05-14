const router = require('express').Router()
const controller = require('./controller')

router.get('/styles/:owner', controller.list)
router.get('/styles/:owner/:styleId', controller.get)
router.get('/styles/:owner/:styleId/html', controller.getHTML)

module.exports = router
