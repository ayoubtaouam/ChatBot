import ConvRepository from './conversations.repository';

export const ConvService = {
  create: () => ConvRepository.createConversation(),

  getAll: () => ConvRepository.getAll(),

  getMessages: (conversationId: number) =>
    ConvRepository.getMessages(conversationId),

  saveMessage: (
    conversationId: number,
    role: string,
    content: string
  ) => ConvRepository.saveMessage(conversationId, role, content),
};