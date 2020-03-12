const express = require('express')
const movieController = require('../controller/movieController')
const router = express.Router()

router.get('/movies', movieController.findAll)
router.post('/movies', movieController.create)
router.delete('/movies/:id', movieController.delete)
router.patch('/movies/:id', movieController.update)

module.exports = router