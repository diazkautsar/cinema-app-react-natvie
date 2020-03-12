const express = require('express')
const router = express.Router()
const controller = require('../controller/index')

router.get('/entertain', controller.getAll)

// movie router
router.post('/entertain/movies', controller.createMovie)
router.patch('/entertain/movies/:id', controller.updateMovie)
router.delete('/entertain/movies/:id', controller.deleteMovie)

// tv router
router.post('/entertain/tvseries', controller.createSeries)
router.patch('/entertain/tvseries/:id', controller.updateSeries)
router.delete('/entertain/tvseries/:id', controller.deleteSeries)

module.exports = router