import { Request, Response } from 'express';
import ChatService from './chat.service';

class ChatController {
  async sendMessage(req: Request, res: Response) {
    try {
      const { conversationId, message } = req.body;

      if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required' });
      }
      const response = await ChatService.sendMessage(conversationId, message);

      res.json(response);
    } catch (err) {
      console.error('Error in sendMessage:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ChatController();