"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const chat_routes_1 = __importDefault(require("./modules/chat/chat.routes"));
const keys_routes_1 = __importDefault(require("./modules/keys/keys.routes"));
const models_routes_1 = __importDefault(require("./modules/models/models.routes"));
const conversations_routes_1 = __importDefault(require("./modules/conversations/conversations.routes"));
const rag_service_1 = require("./ai/rag.service");
(async () => {
    await rag_service_1.ragService.init();
    console.log('Knowledge base loaded');
})();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/chat', chat_routes_1.default);
exports.app.use('/settings', keys_routes_1.default);
exports.app.use('/models', models_routes_1.default);
exports.app.use('/conversations', conversations_routes_1.default);
//# sourceMappingURL=app.js.map