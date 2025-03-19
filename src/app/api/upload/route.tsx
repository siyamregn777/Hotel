import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const dbName = 'myDatabase';
    const mongoose = await connectToDatabase(dbName);
    const db = mongoose.connection;

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    // Step 1: Upload image to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Use your Cloudinary upload preset
    cloudinaryFormData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!); // Use your Cloudinary cloud name

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    const cloudData = await cloudinaryResponse.json();
    if (!cloudinaryResponse.ok) throw new Error(cloudData.error.message);

    const imageUrl = cloudData.secure_url; // Get the uploaded image URL

    // Step 2: Save the image URL to the database
    const result = await db.collection('images').insertOne({
      imageUrl,
      uploadDate: new Date(),
      source: 'Cloudinary',
    });

    return NextResponse.json({ success: true, imageId: result.insertedId, imageUrl }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    console.error('An unknown error occurred');
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 });
  }
}