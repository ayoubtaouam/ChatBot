import { Router } from 'express';
import { ConvController } from './conversations.controller';

const router = Router();

router.post('/', ConvController.create);

export default router;