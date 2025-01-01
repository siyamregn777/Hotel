import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("Booking");
        const collection = db.collection("books");

        const {
            name,
            email,
            checkInDate,
            checkOutDate,
            activity,
            participants,
            roomType,
            roomNumber,
        } = await req.json();

        // Check if room is available
        const existingBooking = await collection.findOne({
            roomType,
            roomNumber,
            $or: [
                {
                    checkInDate: { $lte: checkOutDate },
                    checkOutDate: { $gte: checkInDate },
                },
                {
                    checkInDate: { $gte: checkInDate },
                    checkOutDate: { $lte: checkOutDate },
                },
            ],
        });

        if (existingBooking) {
            return NextResponse.json(
                { success: false, message: "Room is already booked for these dates." },
                { status: 400 }
            );
        }

        // Proceed with the booking
        await collection.insertOne({
            name,
            email,
            checkInDate,
            checkOutDate,
            activity,
            participants,
            roomType,
            roomNumber,
        });

        return NextResponse.json({
            success: true,
            message: "Booking successfully submitted.",
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, message: "Error processing your request." },
            { status: 500 }
        );
    }
}
