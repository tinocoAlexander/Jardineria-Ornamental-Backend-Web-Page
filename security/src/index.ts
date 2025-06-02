import express from 'express';
import securityRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', securityRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

