import { Router } from 'express';
// Importamos las funciones del controlador y la validación de datos
import { createServiceHandler, getAllServicesHandler, getServiceByIdHandler, updateServiceHandler, disableServiceHandler } from '../controllers/service.controller';
import { validateService } from '../middlewares/service.validation';

const router = Router();

// Rutas publicas, estas se les agregara seguridad en el futuro
router.get('/services', getAllServicesHandler);
router.get('/services/:id', getServiceByIdHandler);
router.put('/update-service/:id', updateServiceHandler);
router.delete('/delete-service/:id', disableServiceHandler);
router.post('/create-service', validateService, createServiceHandler);


export default router;