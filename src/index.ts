import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';

import authRoutes from './routes/auth.route';
import contentRoutes from './routes/content.route';
import serviceRoutes from './routes/service.route';
import appointmentRoutes from './routes/appointment.route';

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors()); // Hacer cambio correspondiente para que no se acepten peticiones de cualquier IP


app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.',
});
app.use(limiter);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de contenido
app.use('/api/content', contentRoutes);

// Rutas de servicio
app.use('/api/services', serviceRoutes);

// Rutas de citas
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT

connectDB().then(() => {
  console.log('Base de datos conectada correctamente');
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});