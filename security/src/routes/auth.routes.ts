import { Router } from 'express';
import { loginController, refreshTokenController, logoutController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginController); // Aquí irá la lógica del login
router.post('/refresh', refreshTokenController); // Aquí irá la lógica para refrescar el token
router.post('/logout', logoutController); // Aquí irá la lógica para cerrar sesión

export default router;