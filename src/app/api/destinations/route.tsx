import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import clientPromise from '../../../../lib/mongodb'; // Ensure this imports correctly

// Disable Next.js body parsing to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to insert data into MongoDB
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ success: false, message: 'Form parsing error' });
      }

      const { name, description, region, country } = fields;
      const imageFile = files.image[0]; // Access the uploaded image

      // Validate required fields
      if (!name || !description || !region || !country || !imageFile) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      try {
        const client = await clientPromise;
        const db = client.db('Destination');
        const collection = db.collection('destinat');

        // Read the file and convert to base64 or save it directly to cloud storage
        const imageData = fs.readFileSync(imageFile.filepath);

        // Insert the destination into the database
        const result = await collection.insertOne({
          name,
          description,
          region,
          country,
          imagePath: imageData.toString('base64'), // Convert to base64 for storage
          createdAt: new Date(),
        });

        return res.status(200).json({ success: true, id: result.insertedId });
      } catch (error: unknown) {
        console.error('Error inserting data into the database:', error);

        if (error instanceof Error) {
          return res.status(500).json({ success: false, message: 'Failed to add destination', error: error.message });
        }

        return res.status(500).json({ success: false, message: 'Failed to add destination', error: 'Unknown error' });
      }
    });
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}