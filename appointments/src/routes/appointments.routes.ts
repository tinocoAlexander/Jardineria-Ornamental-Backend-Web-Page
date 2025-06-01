import { Router } from 'express';
// Crear cita, enpoint y validación de datos
import { createAppointmentHandler } from '../controllers/appointments.controller';
import { validateAppointment } from '../middlewares/appointment.validation';
import { checkServiceIdsExist } from '../middlewares/validateServiceIds';

const router = Router();

router.post('/create-appointment', validateAppointment, checkServiceIdsExist, createAppointmentHandler);

export default router;