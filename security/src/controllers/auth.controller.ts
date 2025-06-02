import { Request, Response } from 'express';
import { loginService } from '../services/auth.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';

export const loginController = async (req: Request, res: Response) => {
try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginService(email, password);

    // Enviar como cookies seguras
    res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false, // Cambiar a true en producción
    sameSite: 'none',
    domain: 'localhost',
    path: '/',
    maxAge: 1000 * 60 * 15, // 15 minutos
    });

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // Cambiar a true en producción
    sameSite: 'none',
    domain: 'localhost',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });

    res.status(200).json({ message: 'Login exitoso' });
} catch (error: any) {
    res.status(401).json({ message: error.message });
}
};

export const refreshTokenController = (req: Request, res: Response) => {
const refreshToken = req.cookies?.refreshToken;
if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token no proporcionado' });
}

try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
    userId: string;
    role: string;
    };

    const newAccessToken = jwt.sign(
    { userId: decoded.userId, role: decoded.role },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 15,
    });

    return res.status(200).json({ message: 'Token renovado' });
} catch (error) {
    return res.status(403).json({ message: 'Refresh token inválido' });
}
};

export const logoutController = (req: Request, res: Response) => {
res.clearCookie('accessToken', { httpOnly: true, sameSite: 'strict', secure: true });
res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict', secure: true });
return res.status(200).json({ message: 'Sesión cerrada correctamente' });
};

// Ruta temporal: crear solo un usuario administrador inicial
export const registerAdminOnce = async (req: Request, res: Response) => {
  try {
    // Verifica si ya existe un admin
    const existing = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (existing) {
      return res.status(403).json({ message: 'Ya existe un administrador. Esta ruta está deshabilitada.' });
    }

    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return res.status(201).json({
      message: 'Administrador creado correctamente',
      userId: newUser.id,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al crear administrador', error: error.message });
  }
};