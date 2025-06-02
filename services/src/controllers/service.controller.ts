import { Request, Response } from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  disableService,
  updateService
} from '../services/service.service';
import { validationResult } from 'express-validator';

// Crear servicio
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

// Obtener todos los servicios
export const getAllServicesHandler = async (_req: Request, res: Response) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

// Obtener servicio por ID
export const getServiceByIdHandler = async (req: Request, res: Response) => {
  try {
    const service = await getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

// Actualizar servicio
export const updateServiceHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateService(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

// Deshabilitar servicio (borrado lógico)
export const disableServiceHandler = async (req: Request, res: Response) => {
  try {
    const disabled = await disableService(req.params.id);
    res.status(200).json({ message: 'Servicio deshabilitado', service: disabled });
  } catch (error) {
    res.status(500).json({ error: 'Error al deshabilitar el servicio' });
  }
};