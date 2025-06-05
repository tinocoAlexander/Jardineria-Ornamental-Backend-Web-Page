import { body } from 'express-validator';

export const validateAppointment = [
    body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio')
        .isLength({min: 10, max:10}).withMessage('El teléfono debe tener 10 dígitos')
        .matches(/^\d+$/).withMessage('El teléfono debe contener solo números'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('address').notEmpty().withMessage('La dirección es obligatoria'),
    body('scheduledDate').notEmpty().withMessage('La fecha para agendar la cita es obligatoria'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    body('serviceIds').isArray({ min: 1 }).withMessage('Debes seleccionar al menos un servicio'),
];
