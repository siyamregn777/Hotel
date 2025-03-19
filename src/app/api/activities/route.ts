import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb'; // Adjust the path to your MongoDB connection
import Activity from '@/models/Activity'; // Path to your Activity model

// Handle GET request to fetch activities and reviews
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activityId = searchParams.get('activityId');

    await connectToDatabase('myDatabase'); // Replace with your database name

    if (activityId) {
      // Fetch a single activity with reviews
      const activity = await Activity.findById(activityId);
      if (!activity) {
        return NextResponse.json({ success: false, message: 'Activity not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, activity });
    } else {
      // Fetch all activities
      const activities = await Activity.find();
      return NextResponse.json({ success: true, activities });
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ success: false, message: 'Error fetching activities' }, { status: 500 });
  }
}

// Handle POST request to add a review
export async function POST(req: Request) {
  try {
    const { activityId, userName, comment, rating } = await req.json();

    // Validate input
    if (!activityId || !userName || !comment || rating < 0 || rating > 5) {
      return NextResponse.json({ success: false, message: 'Invalid review data' }, { status: 400 });
    }

    await connectToDatabase('myDatabase'); // Replace with your database name

    // Update the activity with the new review
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        $push: {
          reviews: { userName, comment, rating, createdAt: new Date() },
        },
      },
      { new: true }
    );

    if (!updatedActivity) {
      return NextResponse.json({ success: false, message: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Review added successfully!',
      reviews: updatedActivity.reviews,
    });
  } catch (error) {
    console.error('Error processing review:', error);
    return NextResponse.json({ success: false, message: 'Error processing the review' }, { status: 500 });
  }
}