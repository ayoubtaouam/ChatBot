import { Request, Response } from 'express';
import { ConvService } from './conversations.service';

export const ConvController = {
  async create(req: Request, res: Response) {
    const id = await ConvService.create();
    res.json({ conversationId: id });
  },

  async getAll(_req: Request, res: Response) {
    try {
      const conversations = await ConvService.getAll();
      const result = conversations.map((c: any) => ({
        id: c.id,
        createdAt: c.createdAt,
        title: c.messages[0]?.content?.slice(0, 60) || 'New conversation',
      }));
      res.json(result);
    } catch (err) {
      console.error('Error listing conversations:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getMessages(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const messages = await ConvService.getMessages(id);
      res.json(messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ error: 'Invalid conversation id' });
      }

      const deleted = await ConvService.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      res.status(204).send();
    } catch (err) {
      console.error('Error deleting conversation:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};