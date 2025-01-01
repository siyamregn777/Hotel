import clientPromise from '../../../../lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
  const client: MongoClient = await clientPromise; // Explicitly type client
  const db = client.db('myDatabase');

  const { email, password } = await req.json();
  console.log("Request body:", { email, password }); // Log the request body

  try {
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User already exists' }),
        { status: 400 }
      );
    }

    const newUser = await db.collection('users').insertOne({
      email,
      password, // Note: Password should be hashed in production
      createdAt: new Date(),
    });
    console.log("Inserted user:", newUser); // Log inserted user info
    return new Response(
      JSON.stringify({ success: true, userId: newUser.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error inserting user:",
      error instanceof Error ? error.message : error
    );

    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      { status: 500 }
    );
  }
}
