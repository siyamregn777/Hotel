import mongoose from 'mongoose';

let isConnected: boolean = false;

/**
 * Connect to the MongoDB database
 * @param dbName The name of the database to connect to
 * @throws Error if the connection fails
 * @returns The connected Mongoose client
 */
const connectToDatabase = async (dbName: string): Promise<typeof mongoose> => {
  if (isConnected) return mongoose; // If already connected, return the Mongoose instance

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    // Connect to the specified database using Mongoose
    await mongoose.connect(uri, { dbName });
    isConnected = true; // Update connection status
    console.log(`Connected to database: ${dbName}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }

  return mongoose; // Return the connected Mongoose instance
};

export default connectToDatabase;









// import mongoose from 'mongoose';

// let isConnected: boolean = false;

// /**
//  * Connect to the MongoDB database
//  * @param dbName The name of the database to connect to
//  * @throws Error if the connection fails
//  * @returns The connected Mongoose client
//  */
// const connectToDatabase = async (dbName: string): Promise<typeof mongoose> => {
//   if (isConnected) return mongoose; // If already connected, return the Mongoose instance

//   const uri = process.env.MONGODB_URI;

//   if (!uri) {
//     throw new Error("Please define the MONGODB_URI environment variable");
//   }

//   try {
//     // Connect to the specified database using Mongoose
//     await mongoose.connect(uri, { dbName });
//     isConnected = true; // Update connection status
//     console.log(`Connected to database: ${dbName}`);
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }

//   return mongoose; // Return the connected Mongoose instance
// };

// export default connectToDatabase;