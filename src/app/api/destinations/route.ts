import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Destination from '../../../models/Destination';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export async function POST(req: Request) {
  try {
    // Parse the form data from the request
    const formData = await req.formData();

    // Log the received FormData
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Extract fields from the form data
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const region = formData.get('region') as string;
    const country = formData.get('country') as string;
    const imagePath = formData.get('imagePath') as string;

    // Validate required fields
    if (!name || !description || !region || !country || !imagePath) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectToDatabase("myDatabase");

    const newDestination = new Destination({
      name,
      description,
      region,
      country,
      imagePath,
      createdAt: new Date(),
    });

    const savedDestination = await newDestination.save();

    return NextResponse.json(
      { success: true, id: savedDestination._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Error inserting data:', err.message);
    return NextResponse.json(
      { success: false, message: 'Failed to add destination', error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase("myDatabase");
    const destinations = await Destination.find({}).sort({ createdAt: -1 });

    return NextResponse.json(destinations, { status: 200 });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Error fetching destinations:', err.message);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destinations', error: err.message },
      { status: 500 }
    );
  }
}