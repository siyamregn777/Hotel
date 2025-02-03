import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';

export async function DELETE(req: NextRequest) {
  try {
    // Get image ID from query parameters
    const imageId = req.nextUrl.searchParams.get('imageId');  // Use .get() method to access the parameter

    if (!imageId) {
      return NextResponse.json({ success: false, message: 'Image ID is required.' }, { status: 400 });
    }

    const dbName = 'your_database_name';  // Specify your database name
    const mongoose = await connectToDatabase(dbName);
    const db = mongoose.connection;

    // Delete the image from the database
    const result = await db.collection('images').deleteOne({ _id: new mongoose.Types.ObjectId(imageId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Image not found or already deleted.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully.' }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    console.error('An unknown error occurred');
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 });
  }
}
