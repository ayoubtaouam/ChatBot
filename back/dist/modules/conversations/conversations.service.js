"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvService = void 0;
const conversations_repository_1 = __importDefault(require("./conversations.repository"));
exports.ConvService = {
    create: () => conversations_repository_1.default.createConversation(),
    saveMessage: (conversationId, role, content) => conversations_repository_1.default.saveMessage(conversationId, role, content),
};
//# sourceMappingURL=conversations.service.js.map