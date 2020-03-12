const express = require('express')
const tvController = require('../controller/tvController')

const router = express.Router()

router.get('/tvseries', tvController.findALl)
router.post('/tvseries', tvController.create)
router.delete('/tvseries/:id', tvController.delete)
router.patch('/tvseries/:id', tvController.update)

module.exports = router