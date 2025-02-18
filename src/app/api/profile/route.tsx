import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import fs from 'fs';
import path from 'path';
import User from '../../../models/User'; // Import User model

export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle file uploads
  },
};

// Helper function to parse JSON body manually if needed
const parseJson = async (req: NextRequest) => {
  const body = await req.text();
  return JSON.parse(body);
};

export async function GET(req: NextRequest) {
  await connectToDatabase('myDatabase');
  const { searchParams } = req.nextUrl;

  const email = searchParams.get('email'); // Get email from query parameters

  console.log('Fetching profile data for email:', email); // Debugging

  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log('User found:', user); // Debugging
      return NextResponse.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        image: user.image,
      });
    } else {
      console.log('User not found for email:', email); // Debugging
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Error fetching profile data:', err); // Debugging
    return NextResponse.json(
      { message: 'Failed to fetch profile data', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectToDatabase('myDatabase');
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Get email from query parameters

  try {
    const { firstName, lastName, username } = await parseJson(req);
    await User.updateOne(
      { email },
      { $set: { firstName, lastName, username, updatedAt: new Date() } }
    );
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(err);
    return NextResponse.json(
      { message: 'Failed to update profile data', error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase('myDatabase');
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Get email from query parameters

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${file.name}`;

    // Update user image URL in the database
    await User.updateOne(
      { email },
      { $set: { image: imageUrl, updatedAt: new Date() } }
    );

    return NextResponse.json({ imageUrl });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(err);
    return NextResponse.json(
      { message: 'Failed to upload profile image', error: errorMessage },
      { status: 500 }
    );
  }
}