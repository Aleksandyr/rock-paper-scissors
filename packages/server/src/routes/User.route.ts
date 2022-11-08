import express from 'express';
import { UserController } from '../controllers';

const router = express.Router();

router.get('/me', UserController.getMe);
router.put('/stats', UserController.updateUserStats);

export { router };
