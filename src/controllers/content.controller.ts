import { Request, Response } from 'express';
import { Content } from '../models/Content';

export const createContent = async (req: Request, res: Response) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el contenido' });
  }
};

export const getAllContent = async (_req: Request, res: Response) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar el contenido' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el contenido' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json({ message: 'Contenido borrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar el contenido' });
  }
};
