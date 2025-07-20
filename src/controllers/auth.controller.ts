import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { Service } from "../models/Service";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "contraseniasegura";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Ruta para poder logearse
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Ruta para poder crear un administradors
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      res.status(403).json({ message: "El usuario con ese correo ya existe" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Se ha creado el administrador" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el administrador" });
  }
};

// Obtener todos los usuarios excepto el que está en sesión
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const usuarios = await User.find({ _id: { $ne: decoded.userId } }).select(
      "-password"
    );

    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Actualizar perfil de usuario
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const { nombre, apellido, telefono, direccion, avatar } = req.body;

    if (nombre) user.nombre = nombre;
    if (apellido) user.apellido = apellido;
    if (telefono) user.telefono = telefono;
    if (direccion) user.direccion = direccion;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: "Perfil actualizado", user });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// Verifica si el token es válido
export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Refresca el token
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "secret") as { id: string };
    const newAccessToken = jwt.sign({ id: decoded.id }, "secret", {
      expiresIn: "15m",
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Refresh token inválido o expirado" });
  }
};

// Ruta para IA Gemini
export const geminiChatRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "El prompt es requerido." });
    return;
  }

  try {
    const servicios = await Service.find({ activo: true });

    const resumenServicios = servicios.length
      ? servicios
          .map(
            (s) => `• ${s.nombre}: ${s.descripcion} — Precio desde $${s.precio}`
          )
          .join("\n")
      : "Actualmente no hay servicios disponibles.";

    const contexto = `
Eres un asistente de la empresa "Jardineria ornamental", experto en automatización de jardines y en la jardineria en general. 
Estos son los servicios actuales que ofrece la empresa:
${resumenServicios}

Responde con claridad y detalle cualquier duda del cliente, sobre los servicios que tenemos o sobre cualquier otra cosa.
Pregunta del cliente: ${prompt}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [
        {
          role: "user",
          parts: [{ text: contexto }],
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      res.status(500).json({ error: "No se recibió respuesta del modelo." });
      return;
    }

    res.json({ reply: text });
  } catch (error: any) {
    console.error("Error en Gemini:", error);

    if (error.status === 429) {
      res
        .status(429)
        .json({ error: "Demasiadas peticiones. Intenta de nuevo más tarde." });
    } else {
      res
        .status(500)
        .json({ error: "Hubo un error al procesar la petición con Gemini." });
    }
  }
};
