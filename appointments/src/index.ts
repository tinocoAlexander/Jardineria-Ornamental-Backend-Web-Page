import express from 'express';
import appointmentRoutes from './routes/appointments.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
