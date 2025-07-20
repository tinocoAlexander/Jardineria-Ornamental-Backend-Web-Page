import { Request, Response } from "express";
import { Content } from "../models/Content";

export const createContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    console.error("❌ Error al crear contenido:", error);
    res.status(500).json({ message: "Error al crear el contenido" });
  }
};

export const getAllContent = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    console.error("❌ Error al obtener contenido:", error);
    res.status(500).json({ message: "Error al consultar el contenido" });
  }
};

export const updateContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Contenido no encontrado" });
      return;
    }
    res.json(updated);
  } catch (error) {
    console.error("❌ Error al actualizar contenido:", error);
    res.status(500).json({ message: "Error al actualizar el contenido" });
  }
};

export const deleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Contenido no encontrado" });
      return;
    }
    res.json({ message: "Contenido eliminado" });
  } catch (error) {
    console.error("❌ Error al borrar contenido:", error);
    res.status(500).json({ message: "Error al borrar el contenido" });
  }
};

export const toggleActivo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      res.status(404).json({ message: "Contenido no encontrado" });
      return;
    }

    content.activo = !content.activo;
    await content.save();

    res.json({
      message: `Contenido ${content.activo ? "activado" : "desactivado"}`,
      content,
    });
  } catch (error) {
    console.error("❌ Error al cambiar estado activo:", error);
    res.status(500).json({ message: "Error al cambiar estado del contenido" });
  }
};
