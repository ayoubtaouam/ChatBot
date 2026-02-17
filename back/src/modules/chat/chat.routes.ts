import { Router } from 'express';
import ChatController from './chat.controller';

const router = Router();

router.post('/', ChatController.sendMessage);

export default router;