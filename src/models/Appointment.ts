import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  name: String;
  email: string;
  phone: String;
  service: String;
  date: Date;
  message?: String;
  atendido: "pendiente" | "confirmado" | "completado";
  observaciones?: String;
  status: boolean;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String },
    service: { type: String, required: true },
    atendido: {
      type: String,
      enum: ["pendiente", "confirmado", "completado"],
      default: "pendiente",
    },
    observaciones: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
