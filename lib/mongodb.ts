import mongoose from 'mongoose';

let isConnected: boolean = false;

const connectToDatabase = async (dbName: string) => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI || '';

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    await mongoose.connect(uri, { dbName }); // Connect to the specified database
    isConnected = true;
    console.log(`Connected to database: ${dbName}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;