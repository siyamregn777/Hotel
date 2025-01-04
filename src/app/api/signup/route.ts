// src/app/api/signup/route.ts

import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../models/User'; // Import User model

export async function POST(req: Request) {
  await connectToDatabase('myDatabase'); // Connect to 'myDatabase'

  const { username, email, password } = await req.json();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User already exists' }),
        { status: 400 }
      );
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // Password will be hashed automatically in the User model
    });

    // Save the user to the database
    await newUser.save(); // Use the User model's save method
    return new Response(
      JSON.stringify({ success: true, userId: newUser._id }),
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