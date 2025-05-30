import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../controllers/auth.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', ctrlWrapper(registerUser));
router.post('/login', ctrlWrapper(loginUser));
router.post('/refresh', ctrlWrapper(refreshSession));

router.post('/logout', authenticate, ctrlWrapper(logoutUser));

export default router;
