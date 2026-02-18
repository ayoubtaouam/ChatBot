import { Request, Response } from 'express';
import { KeysService } from './keys.service';

export const KeysController = {
  async save(req: Request, res: Response) {
    const { apiKey } = req.body;
    await KeysService.saveApiKey(apiKey);
    res.json({ success: true });
  },

  async status(req: Request, res: Response) {
    const status = await KeysService.getStatus();
    res.json(status);
  },
};