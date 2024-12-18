import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db(); // Get the default database

    return new Response(
      JSON.stringify({
        message: 'Successfully connected to MongoDB Atlas',
        dbName: db.databaseName,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Failed to connect to MongoDB Atlas',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
