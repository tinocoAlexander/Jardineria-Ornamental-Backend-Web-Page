import express from 'express';
import serviceRoutes from './routes/service.routes';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
