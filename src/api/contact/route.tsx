import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb"; // MongoDB client connection (make sure this is set up correctly)
import { MongoClient } from "mongodb";

// API route to handle POST requests
export async function POST(req) {
  try {
    const client = await clientPromise; // Wait for the MongoDB client
    const db = client.db("Contact"); // Use the "Contact" database
    const collection = db.collection("cont"); // Use the "cont" collection

    // Get the form data from the request body
    const { name, email,subject, message } = await req.json();

    // Insert the form data into the collection
    const result = await collection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    // Return success response
    return NextResponse.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error processing form:", error);

    // Return error response
    return NextResponse.json({ success: false, message: "Error processing the form" }, { status: 500 });
  }
}
