import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import securityRoutes from './routes/auth.routes';

const app = express();
const PORT = 3002;

// Middleware de seguridad
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3002', //tenemos que cambiar esto por la url del front
  credentials: true,
}));

// Limitar peticiones por IP (100 peticiones cada 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Logger con morgan guardado en archivo
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' } // 'a' para añadir (append)
);

// Middlewares generales
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', securityRoutes);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
