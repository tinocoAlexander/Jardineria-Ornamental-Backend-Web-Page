import { Router } from 'express';
import { login, registerAdmin } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', login);

export default router;
