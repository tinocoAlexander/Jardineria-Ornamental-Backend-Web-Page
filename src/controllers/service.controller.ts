import { Request, Response } from "express";
import { Service } from "../models/Service";

// Crear un servicio
export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creando el servicio" });
  }
};

// Obtener todos los servicios
export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find({ activo: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los servicios" });
  }
};

// Actualizar servicio
export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!service)
      return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el servicio" });
  }
};

// Borrar servicio
export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!service)
      return res.status(404).json({ message: "Servicio no encontrado" });

    res.json({ message: "Servicio dado de baja correctamente", service });
  } catch (error) {
    res.status(500).json({ message: "Error al dar de baja el servicio" });
  }
};

// Cambiar estado activo/inactivo
export const toggleEstadoService = async (req: Request, res: Response) => {
  try {
    const servicio = await Service.findById(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });

    servicio.activo = !servicio.activo;
    await servicio.save();

    res.json({
      message: `Servicio ${servicio.activo ? "activado" : "desactivado"}`,
      servicio,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cambiar el estado del servicio" });
  }
};
