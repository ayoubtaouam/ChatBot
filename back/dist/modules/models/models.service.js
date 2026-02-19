"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_repository_1 = __importDefault(require("./models.repository"));
class ModelsService {
    async listModels() {
        const models = await models_repository_1.default.getAll();
        return models.map(m => ({
            name: m.name,
            provider: m.provider,
            selected: m.isSelected,
        }));
    }
    async selectModel(name) {
        const model = await models_repository_1.default.selectModelByName(name);
        return {
            message: 'Model updated successfully',
            selectedModel: model.name,
        };
    }
}
exports.default = new ModelsService();
//# sourceMappingURL=models.service.js.map