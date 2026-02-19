import { Request, Response } from 'express';
import modelsService from './models.service';

class ModelsController {
  async getModels(req: Request, res: Response) {
    try {
      const models = await modelsService.listModels();
      res.json(models);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async selectModel(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Model name is required' });
      }

      const result = await modelsService.selectModel(name);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ModelsController();