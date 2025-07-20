import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { sendAppointmentMail } from "../utils/mailer";

// Crear una cita
export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cita = new Appointment(req.body);
    await cita.save();

    const { name, email, message, date, service } = cita;

    const mailContent = `
      <h2>🌿 Jardinería Ornamental</h2>
      <p><strong>Hola ${name},</strong> tu cita ha sido agendada correctamente.</p>
      <p><strong>Servicio:</strong> ${service}</p>
      <p><strong>Fecha:</strong> ${new Date(date).toLocaleString()}</p>
      ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ""}
      <p>Nos pondremos en contacto contigo para confirmar los detalles.</p>
    `;

    await sendAppointmentMail(email, "Confirmación de tu cita", mailContent);

    res.status(201).json(cita);
  } catch (error) {
    console.error("❌ Error al crear la cita:", error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

// Obtener todas las citas
export const getAppointments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const citas = await Appointment.find({ status: true }).sort({ date: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas" });
  }
};

// Actualizar cita
export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cita = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cita) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};

// Borrar citas
export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cita = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    if (!cita) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }

    res.json({ message: "Cita eliminada correctamente (baja lógica)", cita });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cita" });
  }
};

// Obtener cita por ID
export const getAppointmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cita = await Appointment.findById(req.params.id);
    if (!cita) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la cita" });
  }
};

// Cambiar estado atendido
export const toggleAtendido = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cita = await Appointment.findById(req.params.id);
    if (!cita) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }

    let nuevoEstado = cita.atendido;

    if (cita.atendido === "pendiente") {
      nuevoEstado = "confirmado";
    } else if (cita.atendido === "confirmado") {
      nuevoEstado = "completado";
    }

    cita.atendido = nuevoEstado;
    await cita.save();

    res.json({
      message: `Estado actualizado a: ${cita.atendido}`,
      cita,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado" });
  }
};

// Actualizar observaciones
export const updateObservaciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const { observaciones } = req.body;
    const cita = await Appointment.findByIdAndUpdate(
      req.params.id,
      { observaciones },
      { new: true }
    );
    if (!cita) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar observaciones" });
  }
};


// Obtener solo citas no atendidas
export const getPendingAppointments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const citas = await Appointment.find({ atendido: false }).sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener citas pendientes" });
  }
};


// Citas por rango de fechas
export const getAppointmentsByDate = async (req: Request, res: Response): Promise<void> => {
  const { start, end } = req.query;
  if (!start || !end) {
    res.status(400).json({ message: "Parámetros start y end requeridos" });
    return;
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
    res.status(500).json({ message: "Error al obtener citas por fecha" });
  }
};


// Citas por servicio
export const getAppointmentsByService = async (req: Request, res: Response): Promise<void> => {
  const { servicio } = req.params;
  try {
    const citas = await Appointment.find({ servicio }).sort({ fecha: 1 });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener citas por servicio" });
  }
};


// Estadísticas generales para el panel admin
export const getAppointmentStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const total = await Appointment.countDocuments();
    const atendidas = await Appointment.countDocuments({ atendido: true });
    const pendientes = await Appointment.countDocuments({ atendido: false });

    const porServicio = await Appointment.aggregate([
      { $group: { _id: "$servicio", cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } },
    ]);

    const ahora = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);

    const citasMes = await Appointment.countDocuments({
      fecha: { $gte: inicioMes, $lte: finMes },
    });

    res.json({
      total,
      atendidas,
      pendientes,
      citasMes,
      porServicio,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};


// Vista por calendario
export const getCalendarView = async (_req: Request, res: Response): Promise<void> => {
  try {
    const citas = await Appointment.find();

    const calendario = citas.map((cita) => {
      const duracionEnMinutos = 60;
      const start = new Date(cita.date);
      const end = new Date(start.getTime() + duracionEnMinutos * 60000);

      return {
        id: cita._id,
        title: `${cita.service} - ${cita.name}`,
        start,
        end,
        estado: cita.atendido ? "atendida" : "pendiente",
      };
    });

    res.json(calendario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener calendario de citas" });
  }
};

