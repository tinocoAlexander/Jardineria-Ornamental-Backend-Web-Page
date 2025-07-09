import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ruta para poder logearse
const JWT_SECRET = process.env.JWT_SECRET || "contraseniasegura";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Ruta para poder crear un administradors
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin)
      return res
        .status(403)
        .json({ message: "El usuario con ese correo ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "Se ha creado el administrador" });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el administrador" });
  }
};

// Verifica si el token es válido
export const verifyToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Refresca el token
export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(token, "secret") as {
      id: string;
    };
    const newAccessToken = jwt.sign({ id: decoded.id }, "secret", {
      expiresIn: "15m",
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Refresh token inválido o expirado" });
  }
};
