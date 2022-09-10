const express = require('express')
const router = express.Router()
const controller = require('../controller/Controller')

//user Api
router.post('/register',controller.createItemCategory)
router.get('/items', controller.getItems)

module.exports = router