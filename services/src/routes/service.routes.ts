import { Router } from 'express';
// Importamos las funciones del controlador y la validación de datos
import { createServiceHandler, getAllServicesHandler } from '../controllers/service.controller';
import { validateService } from '../middlewares/service.validation';
import { verifyToken, requireRole } from '../../../security/src/index';

const router = Router();

//router.post('/create-service', validateService, createServiceHandler);

// RUTA PROTEGIDA: Solo admins pueden crear servicios
router.post(
  '/create-service',
  verifyToken,
  requireRole(['ADMIN']),
  validateService,
  createServiceHandler
);

// RUTA PÚBLICA: Todos pueden ver los servicios
router.get('/services', getAllServicesHandler);

export default router;