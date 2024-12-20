import clientPromise from '@/lib/mongodb';

// Define the POST handler
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email and password are required' }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('myDatabase');

    // Check if the user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: 'Login successful', user: { email: user.email } }),
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
