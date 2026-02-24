import express from 'express';
import chatRoutes from './modules/chat/chat.routes';
import keysRoutes from './modules/keys/keys.routes';
import cors from 'cors';
import modelsRoutes from './modules/models/models.routes';
import convRoutes from './modules/conversations/conversations.routes';
import { openaiChatService } from './ai/openaiChat.service';
import { KeysService } from './modules/keys/keys.service';


(async () => {
  await KeysService.validateOpenAI();
  await openaiChatService.init();
  console.log('Knowledge base loaded');
})();

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);
app.use('/settings', keysRoutes);
app.use('/models', modelsRoutes);
app.use('/conversations', convRoutes);