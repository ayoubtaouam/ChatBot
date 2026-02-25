import ConversationsRepository from '../conversations/conversations.repository';
import { openaiChatService } from '../../ai/openaiChat.service';
import ModelRepository from '../models/models.repository';

class ChatService {
  async sendMessage(conversationId: number | null, userMessage: string) {
    let convId = conversationId;

    if (!convId) {
      convId = await ConversationsRepository.createConversation();
    }

    await ConversationsRepository.saveMessage(convId, 'user', userMessage);

    const model = await ModelRepository.getSelected();
    const modelName = model?.name ?? 'gpt-4o';

    const aiAnswer = await openaiChatService.getAnswer({ userMessage });

    const savedAssistantMessage = await ConversationsRepository.saveMessage(
      convId,
      'assistant',
      aiAnswer
    );

    return {
      conversationId: convId,
      message: aiAnswer,
      model: modelName,
      assistantCreatedAt: savedAssistantMessage.createdAt,
    };
  }
}

export default new ChatService();