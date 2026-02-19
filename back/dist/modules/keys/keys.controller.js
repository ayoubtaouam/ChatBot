"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysController = void 0;
const keys_service_1 = require("./keys.service");
exports.KeysController = {
    async save(req, res) {
        const { apiKey } = req.body;
        await keys_service_1.KeysService.saveApiKey(apiKey);
        res.json({ success: true });
    },
    async status(req, res) {
        const status = await keys_service_1.KeysService.getStatus();
        res.json(status);
    },
};
//# sourceMappingURL=keys.controller.js.map