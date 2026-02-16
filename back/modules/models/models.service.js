const modelsRepository = require('./models.repository')

class ModelsService {
    asyn listModels() {
        const models = await modelsRepository.getAll()
        return models.map(m => ({
            name: m.name,
            selected: m.isSelected,
            provider: m.provider
        }))
    }
    async selectModel(name) {
        const model = await modelsRepository.selectModelByName(name)
        return {
            message: 'Model updated successfully',
            selectModel: model.name
        }
    }
}

module.exports = new ModelsService()