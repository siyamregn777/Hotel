import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';

export async function GET() {  
  try {
    const dbName = 'myDatabase'; 
    const mongoose = await connectToDatabase(dbName);
    const db = mongoose.connection;

    const images = await db.collection('images').find({}).toArray();

    return NextResponse.json({ success: true, images }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    console.error('An unknown error occurred');
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 });
  }
}

