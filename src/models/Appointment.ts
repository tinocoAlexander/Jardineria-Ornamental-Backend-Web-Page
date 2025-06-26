import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  nombre: string;
  email: string;
  telefono: string;
  fecha: Date;
  mensaje?: string;
  servicio: string;
  atendido: boolean;
  observaciones?: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha: { type: Date, required: true },
  mensaje: { type: String },
  servicio: { type: String, required: true },
  atendido: { type: Boolean, default: false },
  observaciones: { type: String }, 
}, {
  timestamps: true
});

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
