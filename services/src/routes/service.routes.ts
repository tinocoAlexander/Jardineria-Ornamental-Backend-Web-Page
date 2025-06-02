import { Router } from 'express';
// Importamos las funciones del controlador y la validación de datos
import { createServiceHandler, getAllServicesHandler, getServiceByIdHandler, updateServiceHandler, disableServiceHandler } from '../controllers/service.controller';
import { validateService } from '../middlewares/service.validation';
import { verifyToken } from '../middlewares/verifyToken';
import { requireRole } from '../middlewares/requireRole';

const router = Router();

// Rutas publicas 
router.get('/services', getAllServicesHandler);
router.get('/services/:id', getServiceByIdHandler);

// Proteger rutas con verificación de token y roles
router.put('/update-service/:id', verifyToken, requireRole(['ADMIN']), validateService, updateServiceHandler);
router.delete('/delete-service/:id', verifyToken, requireRole(['ADMIN']), disableServiceHandler);
router.post('/create-service', verifyToken, requireRole(['ADMIN']), validateService, createServiceHandler);


export default router;