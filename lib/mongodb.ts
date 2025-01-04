import mongoose from 'mongoose';

let isConnected: boolean = false; // Track connection status

const connectToDatabase = async (dbName: string) => {
  if (isConnected) {
    return; // If already connected, do nothing
  }

  const uri = process.env.MONGODB_URI || ''; // Get the URI from the environment variable
  
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  
  try {
    await mongoose.connect(uri);
    isConnected = true; // Set the connection status
    console.log(`MongoDB connected to ${dbName} successfully`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;