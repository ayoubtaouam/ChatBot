import { Request, Response } from 'express';
import { ConvService } from './conversations.service';

export const ConvController = {
  async create(req: Request, res: Response) {
    const id = await ConvService.create();
    res.json({ conversationId: id });
  },
};