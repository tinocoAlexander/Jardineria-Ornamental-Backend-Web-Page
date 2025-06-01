// Para poder importar PrismaClient en el resto de la aplicación
// Prisma es nuestro ORM para interactuar con la base de datos
// Usamos ORM con Michel, pero era sequelize
import { PrismaClient } from '../../../generated/prisma';
import * as dotenv from 'dotenv';

dotenv.config();

export const prisma = new PrismaClient();
