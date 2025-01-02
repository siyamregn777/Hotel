import clientPromise from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import User from '../../../models/User'; // Import User model

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Await the client promise to ensure the connection is established
    await clientPromise;

    // Use the User model to find the user
    const user = await User.findOne({ email }); // Find the user by email

    // Check if user exists
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    // Validate the password
    const isPasswordValid = await user.comparePassword(password); // Assuming comparePassword is a method in your User model
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    return new Response(
      JSON.stringify({ success: true, message: 'Login successful', token }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in login API:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}