import express from 'express';
import securityRoutes from './routes/auth.routes';

const app = express();
const PORT = 3002;

app.use(express.json());

app.use('/api/auth', securityRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
