import { Router } from 'express';
import {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
} from '../controllers/content.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Públicas
router.get('/', getAllContent);

// Protegidas
router.post('/', authMiddleware, createContent);
router.put('/:id', authMiddleware, updateContent);
router.delete('/:id', authMiddleware, deleteContent);

export default router;
