import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  seccion: string;
  descripcion: string;
  imagenUrl?: string;
  activo: boolean;
}

const ContentSchema = new Schema<IContent>({
  seccion: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenUrl: { type: String },
  activo: { type: Boolean, default: true },
}, {
  timestamps: true
});

export const Content = mongoose.model<IContent>('Content', ContentSchema);
