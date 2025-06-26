import { Router } from 'express';
import { login, registerAdmin, verifyToken, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', login);
router.get('/verify', verifyToken);
router.post('/refresh-token', refreshToken);

export default router;
