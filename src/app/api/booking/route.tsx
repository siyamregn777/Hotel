import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb"; // Ensure this points to your connection file
import Booking from "../../../models/Booking"; // Ensure you have a Booking model defined

// Define an interface for the expected booking request data
interface BookingRequest {
    name: string;
    email: string;
    checkInDate: string; // Adjust type if using Date
    checkOutDate: string; // Adjust type if using Date
    activity: string;
    participants: number;
    roomType: string;
    roomNumber: string;
}

  
export async function POST(req: Request) {
    try {
        await connectToDatabase("Booking"); // Connect to the database using Mongoose

        const bookingData: BookingRequest = await req.json(); // Parse incoming JSON data

        const {
            name,
            email,
            checkInDate,
            checkOutDate,
            activity,
            participants,
            roomType,
            roomNumber,
        } = bookingData;

        // Check if the room is available
        const existingBooking = await Booking.findOne({
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
        await Booking.create({
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