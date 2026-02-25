import { Router } from 'express';
import { ConvController } from './conversations.controller';

const router = Router();

router.get('/', ConvController.getAll);
router.get('/:id/messages', ConvController.getMessages);
router.post('/', ConvController.create);
router.delete('/:id', ConvController.remove);

export default router;