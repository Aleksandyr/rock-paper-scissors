import express from 'express';
import { UserController } from '../controllers';

const router = express.Router();

router.get('/me', UserController.getMe);
router.put('/move', UserController.updateUserStats);

export { router };
