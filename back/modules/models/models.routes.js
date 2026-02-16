const express = require('express')
const router = express.Router()
const modelsController = require('./models.controller')

router.get('/models', modelsController.getModels.bind(modelsController))
router.post('/models/select', modelsController.selectModel.bind(modelsController))

module.exports = router;