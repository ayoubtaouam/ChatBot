import { Router } from 'express';
import { KeysController } from './keys.controller';

const router = Router();

//router.post('/api-key', KeysController.save);
router.get('/api-key/status', KeysController.status);

export default router;