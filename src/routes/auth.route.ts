import { Router } from 'express';
import { login, registerAdmin, verifyToken } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', login);
router.get('/verify', verifyToken);

export default router;
