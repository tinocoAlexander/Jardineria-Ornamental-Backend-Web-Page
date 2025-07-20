import { Router } from "express";
import {
  login,
  registerAdmin,
  verifyToken,
  refreshToken,
  getUsers,
  updateProfile,
  geminiChatRoute,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/refresh-token", refreshToken);
router.post("/register", registerAdmin);
router.get("/users", authMiddleware, getUsers);
router.put("/profile", authMiddleware, updateProfile);
router.post("/chat-gemini", geminiChatRoute);

export default router;
