import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req: Request) {
  await connectToDatabase('Database');

  try {
    const { currentPassword, newPassword, confirmPassword, userId } = await req.json();

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword || !userId) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'New password and confirm password do not match.' },
        { status: 400 }
      );
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }

    // Verify the current password (handled by the model)
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect.' },
        { status: 400 }
      );
    }

    // Update the user's password (handled by the model)
    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully!',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { success: false, message: 'Error changing password. Please try again.' },
      { status: 500 }
    );
  }
}