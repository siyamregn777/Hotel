import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: 401 }
    );
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return new Response(
      JSON.stringify({ success: true, data: 'Protected data' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Token validation error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid token' }),
      { status: 403 }
    );
  }
}
