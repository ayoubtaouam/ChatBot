"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversations_repository_1 = __importDefault(require("../conversations/conversations.repository"));
const rag_service_1 = require("../../ai/rag.service");
const models_repository_1 = __importDefault(require("../models/models.repository"));
class ChatService {
    async sendMessage(conversationId, userMessage) {
        await conversations_repository_1.default.saveMessage(conversationId, 'user', userMessage);
        const model = await models_repository_1.default.getSelected();
        const modelName = model?.name ?? 'gpt-4o';
        const aiAnswer = await rag_service_1.ragService.getAnswer({ userMessage });
        await conversations_repository_1.default.saveMessage(conversationId, 'assistant', aiAnswer);
        return {
            answer: aiAnswer,
            model: modelName,
        };
    }
}
exports.default = new ChatService();
//# sourceMappingURL=chat.service.js.map