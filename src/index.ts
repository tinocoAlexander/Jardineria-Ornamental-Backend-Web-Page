import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import contentRoutes from "./routes/content.route";
import serviceRoutes from "./routes/service.route";
import appointmentRoutes from "./routes/appointment.route";

dotenv.config();

connectDB();
const app = express();

app.use(
  cors({
    origin: true, // permite cualquier origen dinámicamente
    credentials: true, // permite el uso de cookies y cabeceras con credenciales
  })
);

app.use(express.json({ limit: "0.2mb" }));

app.use(cookieParser());
app.use(helmet());
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Demasiadas solicitudes desde esta IP. Intenta más tarde.",
});
app.use(limiter);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de contenido
app.use("/api/content", contentRoutes);

// Rutas de servicio
app.use("/api/services", serviceRoutes);

// Rutas de citas
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  console.log("Base de datos conectada correctamente");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
