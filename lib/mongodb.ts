import mongoose from 'mongoose';

let isConnected: boolean = false;

/**
 * Connect to the MongoDB database
 * @param dbName The name of the database to connect to
 * @throws Error if the connection fails
 * @returns The connected Mongoose client
 */
const connectToDatabase = async (dbName: string): Promise<typeof mongoose> => {
  // Return the existing connection if already connected
  if (isConnected) {
    console.log('Using existing database connection');
    return mongoose;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    const options = {
      dbName, 
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000, 
      maxPoolSize: 10, 
    };
    mongoose.set("bufferCommands", false); 

    await mongoose.connect(uri, options);
    isConnected = true;
    console.log(`Connected to database: ${dbName}`);

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown); 
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }

  return mongoose;
};

/**
 * Gracefully shut down the application and close the MongoDB connection
 */
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  } finally {
    process.exit(0); // Exit the process
  }
};

export default connectToDatabase;