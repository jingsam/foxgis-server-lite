const express = require('express')
const router = express.Router()

router.use('/assets', express.static('./data/assets'))

module.exports = router
