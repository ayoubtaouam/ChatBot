import { Router } from 'express';
import modelsController from './models.controller';

const router = Router();

router.get('/', modelsController.getModels.bind(modelsController));
router.post('/select', modelsController.selectModel.bind(modelsController));

export default router;