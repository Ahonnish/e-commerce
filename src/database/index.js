const mongoose = require('mongoose');
const config = require('../config/config');

async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
