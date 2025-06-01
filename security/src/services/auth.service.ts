import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }

  const payload = {
    userId: user.id,
    role: user.role, // 'admin'
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};