import express from 'express';
import type { Request, Response } from 'express';
import { login, signup } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', protect, (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

export default router;
