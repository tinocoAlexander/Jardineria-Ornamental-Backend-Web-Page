import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  toggleAtendido,
  updateObservaciones,
  getPendingAppointments,
  getAppointmentsByDate,
  getAppointmentsByService,
  getAppointmentStats,
  getCalendarView,
} from "../controllers/appointment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Cliennte
router.post("/", createAppointment);

// Admin
router.get("/", authMiddleware, getAppointments);
router.get("/pending", authMiddleware, getPendingAppointments);
router.get("/by-date", authMiddleware, getAppointmentsByDate);
router.get("/by-service/:servicio", authMiddleware, getAppointmentsByService);
router.get("/:id", authMiddleware, getAppointmentById);

router.put("/:id", authMiddleware, updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

router.patch("/:id/atendido", authMiddleware, toggleAtendido);
router.patch("/:id/observaciones", authMiddleware, updateObservaciones);

router.get("/stats", authMiddleware, getAppointmentStats);
router.get("/calendar", authMiddleware, getCalendarView);

export default router;
