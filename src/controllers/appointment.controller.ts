import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { sendAppointmentMail } from '../utils/mailer';

// Crear una cita
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

// Obtener todas las citas
export const getAppointments = async (_req: Request, res: Response) => {
  try {
    const citas = await Appointment.find().sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};

// Actualizar cita
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};

// Borrar citas
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findByIdAndDelete(req.params.id);
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita' });
  }
};

// Obtener cita por ID
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findById(req.params.id);
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita' });
  }
};

// Cambiar estado atendido
export const toggleAtendido = async (req: Request, res: Response) => {
  try {
    const cita = await Appointment.findById(req.params.id);
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });

    cita.atendido = !cita.atendido;
    await cita.save();
    res.json({ message: `Cita marcada como ${cita.atendido ? 'atendida' : 'no atendida'}`, cita });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado' });
  }
};

// Actualizar observaciones
export const updateObservaciones = async (req: Request, res: Response) => {
  try {
    const { observaciones } = req.body;
    const cita = await Appointment.findByIdAndUpdate(
      req.params.id,
      { observaciones },
      { new: true }
    );
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar observaciones' });
  }
};

// Obtener solo citas no atendidas
export const getPendingAppointments = async (_req: Request, res: Response) => {
  try {
    const citas = await Appointment.find({ atendido: false }).sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas pendientes' });
  }
};

// Citas por rango de fechas
export const getAppointmentsByDate = async (req: Request, res: Response) => {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ message: 'Parámetros start y end requeridos' });
  }

  try {
    const citas = await Appointment.find({
      fecha: {
        $gte: new Date(start as string),
        $lte: new Date(end as string),
      },
    }).sort({ fecha: 1 });

    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas por fecha' });
  }
};

// Citas por servicio
export const getAppointmentsByService = async (req: Request, res: Response) => {
  const { servicio } = req.params;
  try {
    const citas = await Appointment.find({ servicio }).sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas por servicio' });
  }
};
