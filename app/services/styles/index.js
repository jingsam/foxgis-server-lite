const router = require('express').Router()
const styles = require('./controller')

router.get('/styles', styles.list)
router.get('/styles/:styleId', styles.get)
router.get('/styles/:styleId/html', styles.getHtml)

module.exports = router
