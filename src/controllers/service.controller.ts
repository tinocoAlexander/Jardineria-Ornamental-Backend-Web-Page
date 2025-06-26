import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el servicio' });
  }
};

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find({ activo: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo los servicios' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el servicio' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el servicio' });
  }
};
