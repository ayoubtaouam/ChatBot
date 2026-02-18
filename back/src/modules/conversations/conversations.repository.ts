import { prisma } from '../../config/prisma';
import { Conversation, Message } from '@prisma/client';

class ConversationsRepository {
  async createConversation(): Promise<number> {
    const conv: Conversation = await prisma.conversation.create({
      data: {},
    });

    return conv.id;
  }

  async saveMessage(
    conversationId: number,
    role: string,
    content: string
  ): Promise<Message> {
    return prisma.message.create({
      data: {
        conversationId,
        role,
        content,
      },
    });
  }
}

export default new ConversationsRepository();