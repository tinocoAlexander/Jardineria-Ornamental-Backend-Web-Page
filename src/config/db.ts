import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Se ha producido un error al conectarse a la base de datos:', error);
    process.exit(1);
  }
};

export default connectDB;
