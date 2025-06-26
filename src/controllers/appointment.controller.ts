import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { sendAppointmentMail } from '../utils/mailer';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const cita = new Appointment(req.body);
    await cita.save();

    const { nombre, email, mensaje, fecha, servicio } = cita;

    const mailContent = `
      <h2>🌿 Jardinería Ornamental</h2>
      <p><strong>Hola ${nombre},</strong> tu cita ha sido agendada correctamente.</p>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleString()}</p>
      ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
      <p>Nos pondremos en contacto contigo para confirmar los detalles.</p>
    `;

    await sendAppointmentMail(email, 'Confirmación de tu cita', mailContent);

    res.status(201).json(cita);
  } catch (error) {
    console.error('❌ Error al crear la cita:', error);
    res.status(500).json({ message: 'Error al crear la cita' });
  }
};

export const getAppointments = async (_req: Request, res: Response) => {
  try {
    const citas = await Appointment.find().sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findByIdAndDelete(req.params.id);
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita' });
  }
};
