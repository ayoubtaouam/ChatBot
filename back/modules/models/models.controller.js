const modelsService = require('./models.service')

class ModelsController {
    async getModels(req, res) {
        try {
            const models = await modelsService.listModels();
            res = models.json({ models })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error.' })
        }
    }
    async selectModel(req, res) {
        try {
            const { name } = req.body
            if { !name } retrun res.status(400).json({ error: 'Model name is required!' })
            const result = await modelService.selectModel(name)
            res.status(500).json({ error: 'Internal server error!' })
        }
    }
}

module.exports = new ModelsController();