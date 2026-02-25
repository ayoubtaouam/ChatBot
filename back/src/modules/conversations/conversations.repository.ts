import { prisma } from '../../config/prisma';
import { Conversation, Message } from '@prisma/client';

class ConversationsRepository {
  async createConversation(): Promise<number> {
    const conv: Conversation = await prisma.conversation.create({
      data: {},
    });

    return conv.id;
  }

  async getAll() {
    return prisma.conversation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'asc' },
          where: { role: 'user' },
        },
      },
    });
  }

  async getMessages(conversationId: number) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      select: { role: true, content: true },
    });
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