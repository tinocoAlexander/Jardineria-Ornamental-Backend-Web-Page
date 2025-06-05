import { Router } from 'express';
import {
  createAppointmentHandler,
  getAppointmentsHandler,
  getAppointmentByIdHandler,
  updateAppointmentHandler,
  deleteAppointmentHandler
} from '../controllers/appointments.controller';
import { validateAppointment } from '../middlewares/appointment.validation';
import { checkServiceIdsExist } from '../middlewares/validateServiceIds';

const router = Router();

router.post('/create-appointment', validateAppointment, checkServiceIdsExist, createAppointmentHandler);
router.get('/appointments', getAppointmentsHandler);
router.get('/appointments/:id', getAppointmentByIdHandler);
router.put('/update-appointment/:id', validateAppointment, checkServiceIdsExist, updateAppointmentHandler);
router.delete('/delete-appointment/:id', deleteAppointmentHandler);

export default router;