import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email inválido"],
    },
    password: {
      type: String,
        required: true,
        select: false, // <-- No se incluye por defecto en consultas
    },
  },
  {
    timestamps: true, // <-- Agrega createdAt y updatedAt automáticamente
  }
);

export const User = model<IUser>("User", UserSchema);
