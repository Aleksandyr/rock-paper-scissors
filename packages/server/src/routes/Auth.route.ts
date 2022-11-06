import express from 'express';

import { AuthController } from '../controllers';
import { passport } from '../middleware';

const router = express.Router();

router.post('/login', passport.authenticate('local'), AuthController.login);

export { router };