import { Request, Response } from "express";
import { Service } from "../models/Service";
import { RequestHandler } from "express";

// Crear un servicio
export const createService: RequestHandler = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creando el servicio" });
  }
};

// Obtener todos los servicios
export const getServices: RequestHandler = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los servicios" });
  }
};

// Actualizar servicio
export const updateService: RequestHandler = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!service) {
      res.status(404).json({ message: "Servicio no encontrado" });
      return; // solo para cortar el flujo, pero sin retornar Response
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el servicio" });
  }
};

// Borrar servicio
export const deleteService: RequestHandler = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!service) {
      res.status(404).json({ message: "Servicio no encontrado" });
      return; // solo para cortar el flujo, pero sin retornar Response
    }

    res.json({ message: "Servicio dado de baja correctamente", service });
  } catch (error) {
    res.status(500).json({ message: "Error al dar de baja el servicio" });
  }
};

// Cambiar estado activo/inactivo
export const toggleEstadoService: RequestHandler = async (req, res) => {
  try {
    const servicio = await Service.findById(req.params.id);

    if (!servicio) {
      res.status(404).json({ message: "Servicio no encontrado" });
      return;
    }

    servicio.activo = !servicio.activo;
    await servicio.save();

    res.json(servicio);
  } catch (error) {
    console.error("❌ Error en toggleEstadoService:", error);
    res
      .status(500)
      .json({ message: "Error al cambiar el estado del servicio" });
  }
};
