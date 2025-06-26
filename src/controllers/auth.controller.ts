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

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m'
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d'
  });

  // Guardar el refresh token en cookie segura
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
  });

  return res.json({ accessToken, user: { email: user.email, nombre: user.nombre } });
};

// Verifica si el token es válido
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false, message: 'Token requerido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token inválido o expirado' });
  }
};

// Refresca el token
export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '15m'
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token inválido o expirado' });
  }
};