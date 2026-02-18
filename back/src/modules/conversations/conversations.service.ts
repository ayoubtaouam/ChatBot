import { ConvRepository } from './conversations.repository';

export const ConvService = {
  create: () => ConvRepository.createConversation(),

  saveMessage: (
    conversationId: number,
    role: string,
    content: string
  ) => ConvRepository.saveMessage(conversationId, role, content),
};
