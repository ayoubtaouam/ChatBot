import ConversationsRepository from '../conversations/conversations.repository';
import { ragService } from '../../ai/rag.service';
import ModelRepository from '../models/models.repository';

class ChatService {
  async sendMessage(conversationId: number, userMessage: string) {
    await ConversationsRepository.saveMessage(conversationId, 'user', userMessage);

    const model = await ModelRepository.getSelected();
    const modelName = model?.name ?? 'gpt-4o';

    const aiAnswer = await ragService.getAnswer({ userMessage });

    await ConversationsRepository.saveMessage(conversationId, 'assistant', aiAnswer);

    return {
      answer: aiAnswer,
      model: modelName,
    };
  }
}

export default new ChatService();