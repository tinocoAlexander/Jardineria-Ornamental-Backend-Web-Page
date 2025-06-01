import { Request, Response } from 'express';
import { createService, getAllServices } from '../services/service.service';
import { validationResult } from 'express-validator';

export const createServiceHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const service = await createService(req.body);
        res.status(201).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};

export const getAllServicesHandler = async (_req: Request, res: Response) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};
