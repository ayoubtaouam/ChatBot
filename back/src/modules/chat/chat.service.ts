import ConversationsRepository from '../conversations/conversations.repository';
import { ragService } from '../../ai/rag.service';
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

    const aiAnswer = await ragService.getAnswer({ userMessage });

    await ConversationsRepository.saveMessage(convId, 'assistant', aiAnswer);

    return {
      conversationId: convId,
      message: aiAnswer,
      model: modelName,
    };
  }
}

export default new ChatService();