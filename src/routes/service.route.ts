import { Router } from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService
} from '../controllers/service.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Público (cliente ve los servicios activos)
router.get('/', getServices);

// Admin
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;
