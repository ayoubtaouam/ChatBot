"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_service_1 = __importDefault(require("./models.service"));
class ModelsController {
    async getModels(req, res) {
        try {
            const models = await models_service_1.default.listModels();
            res.json({ models });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async selectModel(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'Model name is required' });
            }
            const result = await models_service_1.default.selectModel(name);
            res.json(result);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.default = new ModelsController();
//# sourceMappingURL=models.controller.js.map