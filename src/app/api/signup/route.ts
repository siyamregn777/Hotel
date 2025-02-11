import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req: Request) {
    try {
        await connectToDatabase('myDatabase');
        const { firstName, lastName, username, email, password } = await req.json();

        

        // Check if password length is at least 6 characters
        if (password.length < 6) {
            return new Response(
                JSON.stringify({ success: false, message: 'Password must be at least 6 characters long' }),
                { status: 400 }
            );
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: existingUser.email === email
                        ? 'Email already exists'
                        : 'Username already taken',
                }),
                { status: 400 }
            );
        }

        // Create and save new user
        const newUser = new User({ firstName, lastName, username, email, password });
        await newUser.save();

        return new Response(
            JSON.stringify({ success: true, userId: newUser._id }),
            { status: 201 }
        );
    } catch (error: unknown) {
        // Check if the error is an instance of Error and handle it
        if (error instanceof Error) {
            console.error("Error inserting user:", error.message);
            return new Response(
                JSON.stringify({ success: false, message: error.message || 'An error occurred. Please try again.' }),
                { status: 500 }
            );
        }

        // If the error is not an instance of Error, return a generic message
        return new Response(
            JSON.stringify({ success: false, message: 'An unknown error occurred.' }),
            { status: 500 }
        );
    }
}
