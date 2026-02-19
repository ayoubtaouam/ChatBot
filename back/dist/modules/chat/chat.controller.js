"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_service_1 = __importDefault(require("./chat.service"));
class ChatController {
    async sendMessage(req, res) {
        try {
            const { conversationId, message } = req.body;
            if (!message || message.trim() === '') {
                return res.status(400).json({ error: 'Message is required' });
            }
            const response = await chat_service_1.default.sendMessage(conversationId, message);
            res.json(response);
        }
        catch (err) {
            console.error('Error in sendMessage:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.default = new ChatController();
//# sourceMappingURL=chat.controller.js.map