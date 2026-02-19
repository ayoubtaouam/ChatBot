"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvController = void 0;
const conversations_service_1 = require("./conversations.service");
exports.ConvController = {
    async create(req, res) {
        const id = await conversations_service_1.ConvService.create();
        res.json({ conversationId: id });
    },
};
//# sourceMappingURL=conversations.controller.js.map