import connectToDatabase from '../../../../lib/mongodb'; // Adjust the import based on your file structure
import jwt from 'jsonwebtoken';
import User from '../../../models/User'; // Import User model
import Admin from '../../../models/Admin'; // Import Admin model

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'username and password are required' }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase('myDatabase'); // Connect to 'myDatabase'

    // Check for the admin first
    const admin = await Admin.findOne({ username }); // Find admin by email
    if (admin) {
      const isPasswordValid = await admin.comparePassword(password); // Validate the password
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { status: 401 }
        );
      }

      // Generate JWT token for admin
      const token = jwt.sign({ email: admin.email, id: admin._id }, SECRET_KEY, { expiresIn: '1h' });
      return new Response(
        JSON.stringify({ success: true, message: 'Login successful', token, role: 'admin' }),
        { status: 200 }
      );
    }

    // If not an admin, check for regular user
    const user = await User.findOne({ username }); // Find user by email
    if (user) {
      const isPasswordValid = await user.comparePassword(password); // Validate the password
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { status: 401 }
        );
      }

      // Generate JWT token for user
      const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
      return new Response(
        JSON.stringify({ success: true, message: 'Login successful', token, role: 'user' }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: 'User or Admin not found' }),
      { status: 404 }
    );
  } catch (error) {
    console.error('Error in login API:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}