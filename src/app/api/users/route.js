import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('myDatabase');

  const { email, password } = await req.json();
  console.log("Request body:", { email, password }); // Log the request body

  try {
    const newUser = await db.collection('users').insertOne({
      email,
      password,
    });
    console.log("Inserted user:", newUser); // Log inserted user info
    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
  } catch (error) {
    console.error("Error inserting user:", error); // Log any errors
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
