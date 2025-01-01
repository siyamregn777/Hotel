//lib/mongodb.js file
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb"; // JavaScript module
import { MongoClient } from "mongodb";

// Define the expected shape of the request body
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    // Typecast the imported clientPromise to avoid TypeScript errors
    const client: MongoClient = await (clientPromise as Promise<MongoClient>);
    const db = client.db("Contact");
    const collection = db.collection("cont");

    // Parse request body
    const { name, email, subject, message }: ContactForm = await req.json();

    // Insert data into MongoDB
    await collection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

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
