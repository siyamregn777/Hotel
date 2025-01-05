import { NextResponse } from "next/server";
import connectToDatabase from '../../../../lib/mongodb'; // Ensure you import your database connection
import Contact from '../../../models/Contact'; // Import the Contact model

export async function POST(req: Request) {
  await connectToDatabase('Contact'); // Connect to the specified database

  try {
    // Parse request body
    const { name, email, subject, message } = await req.json();

    // Create a new contact document using the Mongoose model
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save the contact data to the database
    await newContact.save();

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { success: false, message: "Error processing the form" },
      { status: 500 }
    );
  }
}