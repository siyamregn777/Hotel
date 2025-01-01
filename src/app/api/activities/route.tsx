import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { MongoClient } from 'mongodb'; // Import MongoClient type

// Type the clientPromise to avoid the implicit 'any' type warning
const clientPromiseTyped: Promise<MongoClient> = clientPromise;

export async function POST(req: Request) {
  const client = await clientPromiseTyped;
  const db = client.db('Database'); // Connect to the database
  const collection = db.collection('active'); // Use the "active" collection
  try {
    const { name, description, price, duration } = await req.json();
    // Insert the new activity into the "active" collection
    const result = await collection.insertOne({
      name,
      description,
      price,
      duration,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: unknown) { // Explicitly typing the error as 'unknown'
    console.error('Error saving activity:', error);
    if (error instanceof Error) {
      // Check if error is an instance of Error to safely access error.message
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
