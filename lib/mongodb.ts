import mongoose from 'mongoose';

const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri); // Removed deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;