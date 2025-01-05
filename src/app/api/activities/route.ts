import { NextResponse } from "next/server";
import connectToDatabase from '../../../../lib/mongodb'; // Ensure you import your database connection
import Activity from '../../../models/Activity'; // Import the Activity model

export async function POST(req: Request) {
  await connectToDatabase('Database'); // Connect to the 'Database'

  try {
    // Parse request body
    const { name, description, price, duration } = await req.json();

    // Create a new activity document using the Mongoose model
    const newActivity = new Activity({
      name,
      description,
      price: Number(price),
      duration: Number(duration),
    });

    // Save the activity data to the database
    await newActivity.save();

    return NextResponse.json({
      success: true,
      message: "Activity added successfully!",
      id: newActivity._id, // Return the inserted ID
    });
  } catch (error) {
    console.error("Error processing activity:", error);
    return NextResponse.json(
      { success: false, message: "Error processing the activity" },
      { status: 500 }
    );
  }
}