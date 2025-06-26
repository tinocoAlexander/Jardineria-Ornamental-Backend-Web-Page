import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

const ServiceSchema = new Schema<IService>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  activo: { type: Boolean, default: true },
}, {
  timestamps: true
});

export const Service = mongoose.model<IService>('Service', ServiceSchema);
