import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Ruta para poder crear un administradors
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const existingAdmin = await User.findOne({});
    if (existingAdmin) return res.status(403).json({ message: 'El usuario de administrador ya existe' });

    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'Se ha creado el administrador' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el administrador' });
  }
};

// Ruta para poder logearse
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({ token, user: { nombre: user.nombre, email: user.email } });
};
