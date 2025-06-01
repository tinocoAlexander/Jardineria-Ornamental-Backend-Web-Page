import { body } from 'express-validator';

export const validateService = [
  body('name')
    .notEmpty()
    .withMessage('El nombre del servicio es obligatorio')
    .isLength({ max: 100 })
    .withMessage('El nombre no puede tener más de 100 caracteres'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder 500 caracteres'),
];
