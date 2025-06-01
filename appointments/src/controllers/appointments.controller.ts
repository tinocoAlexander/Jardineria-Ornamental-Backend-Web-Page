// Aqui haremos todos los endpoints de la API REST para manejar las citas
import { Request, Response } from 'express';
import { createAppointment } from '../services/appointment.service';
import { validationResult } from 'express-validator';

export const createAppointmentHandler = async (req: Request, res: Response) => {

    // Validación de los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const appointment = await createAppointment(req.body);
        res.status(201).json({ message: 'Cita creada correctamente', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la cita' });
    }
};