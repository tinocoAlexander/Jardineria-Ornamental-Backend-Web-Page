import { Router } from 'express';
// Importamos las funciones del controlador y la validación de datos
import { createServiceHandler, getAllServicesHandler } from '../controllers/service.controller';
import { validateService } from '../middlewares/service.validation';

const router = Router();

router.post('/create-service', validateService, createServiceHandler);
router.get('/services', getAllServicesHandler);

export default router;