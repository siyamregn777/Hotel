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
    // Configure Mongoose connection options
    const options = {
      dbName, // Specify the database name
      serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      maxPoolSize: 10, // Increase connection pool size
    };

    // Attempt to connect to MongoDB
    await mongoose.connect(uri, options);
    isConnected = true;
    console.log(`Connected to database: ${dbName}`);

    // Add graceful shutdown handler
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown); // Handle SIGTERM for process managers
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Reset the connection state on error
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