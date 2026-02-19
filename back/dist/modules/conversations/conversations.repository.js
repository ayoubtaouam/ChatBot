"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
class ConversationsRepository {
    async createConversation() {
        const conv = await prisma_1.prisma.conversation.create({
            data: {},
        });
        return conv.id;
    }
    async saveMessage(conversationId, role, content) {
        return prisma_1.prisma.message.create({
            data: {
                conversationId,
                role,
                content,
            },
        });
    }
}
exports.default = new ConversationsRepository();
//# sourceMappingURL=conversations.repository.js.map