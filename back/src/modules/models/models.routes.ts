import { Router } from 'express';
import modelsController from './models.controller';

const router = Router();

router.get('/models', modelsController.getModels.bind(modelsController));
router.post('/models/select', modelsController.selectModel.bind(modelsController));

export default router;