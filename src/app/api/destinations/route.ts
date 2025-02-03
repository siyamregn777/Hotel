import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb'; // MongoDB connection
import Destination from '../../../models/Destination'; // Adjust model path

// Disable Next.js body parsing to handle form uploads if needed
export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, region, country } = body;

    if (!name || !description || !region || !country) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase("Bookin"); // Connect to MongoDB using Mongoose

    // Create a new destination document
    const newDestination = new Destination({
      name,
      description,
      region,
      country,
      createdAt: new Date(),
    });

    const savedDestination = await newDestination.save();

    return NextResponse.json({ success: true, id: savedDestination._id }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error inserting data into the database:', error);

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: 'Failed to add destination', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: false, message: 'Failed to add destination', error: 'Unknown error' }, { status: 500 });
  }
}