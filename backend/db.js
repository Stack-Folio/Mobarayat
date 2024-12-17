const mongoose = require('mongoose');
const mongoURI = 'mongodb://YallaBuzUser:d7rNq2HpV8zT@147.79.115.13:27017/?authSource=admin';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'YallaBuz'
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
