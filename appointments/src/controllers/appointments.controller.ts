import { Request, Response } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} from '../services/appointment.service';
import { validationResult } from 'express-validator';

export const createAppointmentHandler = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json({ message: 'Cita creada correctamente', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

export const getAppointmentsHandler = async (_req: Request, res: Response) => {
  try {
    const appointments = await getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

export const getAppointmentByIdHandler = async (req: Request, res: Response) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Cita no encontrada' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
};

export const updateAppointmentHandler = async (req: Request, res: Response) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json({ message: 'Cita actualizada correctamente', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

export const deleteAppointmentHandler = async (req: Request, res: Response) => {
  try {
    const appointment = await deleteAppointment(req.params.id);
    res.status(200).json({ message: 'Cita eliminada lógicamente', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};