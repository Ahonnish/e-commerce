import mongoose from 'mongoose';
import config from '../config/config';

async function connectDB() {
  try {
    await mongoose.connect(String(config.mongoUri));
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('DB connection failed:', error.message);
    } else {
      console.error('DB connection failed: Unknown error');
    }
    process.exit(1);
  }
}

export default connectDB;
