// src/models/User.ts
import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  direccion?: string;
  rol: "admin" | "empleado";
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
}

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email inválido"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    telefono: { type: String, required: true },
    direccion: { type: String },
    rol: {
      type: String,
      enum: ["admin", "empleado"],
      default: "empleado",
      required: true,
    },
    activo: { type: Boolean, default: true },
    avatar: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
