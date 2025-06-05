import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import appointmentRoutes from './routes/appointments.routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Seguridad con Helmet
app.use(helmet());

// CORS: solo permite peticiones del frontend
app.use(cors({
  origin: 'http://localhost:3000', // Aqui se cambia por la ip del frontend
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas peticiones desde esta IP. Intenta más tarde.'
});
app.use(limiter);

// Logger con morgan (guarda en logs/access.log)
const logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api/appointments', appointmentRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
