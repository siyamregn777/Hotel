import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    // Ensure the database connection is established with a dbName
    const dbName = 'myDatabase'; // Provide your actual database name
    const mongoose = await connectToDatabase(dbName);
    const db = mongoose.connection; // Get the db from the mongoose connection

    // Parse the form data
    const formData = await req.formData();
    const imageUrl = formData.get('imageUrl') as string;

    // Check if the image URL is provided
    if (!imageUrl) {
      return NextResponse.json({ success: false, message: 'No image URL provided.' }, { status: 400 });
    }

    // Validate the image URL (simple check for URL format)
    if (!isValidUrl(imageUrl)) {
      return NextResponse.json({ success: false, message: 'Invalid image URL.' }, { status: 400 });
    }

    // Insert the image URL into the database
    const result = await db.collection('images').insertOne({
      imageUrl,
      uploadDate: new Date(),
      source: 'external',
    });

    return NextResponse.json({ success: true, imageId: result.insertedId }, { status: 201 });

  } catch (error: unknown) {
    // Handle unexpected errors
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    console.error('An unknown error occurred');
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 });
  }
}

// Helper function to validate the URL format
function isValidUrl(url: string): boolean {
  try {
    new URL(url); // Try creating a URL object to check if it's valid
    return true;
  } catch (e) {
    console.error('Invalid Url error', e);
    return false;
  }
}
