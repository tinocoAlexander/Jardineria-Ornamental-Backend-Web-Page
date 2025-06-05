// Librerias a instalar para que pueda funcionar este servicio
// Cookie parser queda pendiente al no implementar autenticación por el momento
import express from 'express';
import serviceRoutes from './routes/service.routes';
//import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001; // Estoy pensando en que podemos usar un esb-service para todos los servicios
// pero que el esb-service sea en nodejs, el servicio de security

app.use(express.json());
//app.use(cookieParser());
app.use(helmet());

// Crear stream para guardar logs en logs/access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' } // 'a' para añadir (append)
);

// Logs HTTP (en consola y archivo)
app.use(morgan('dev')); // Consola
app.use(morgan('combined', { stream: accessLogStream })); // Archivo

app.use(cors({
  origin: 'http://localhost:3001', // Aqui se va a poner la direccion del frontend
  credentials: true // Permite cookies y autenticación
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar a 100 peticiones por IP
  message: 'Demasiadas peticiones, por favor intente más tarde.'
}));

app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
