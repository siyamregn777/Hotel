import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import connectToDatabase from '../../../../lib/mongodb'; // MongoDB connection
import Destination from '../../../models/Destination'; // Mongoose model

// Disable Next.js body parsing to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return res.status(500).json({ success: false, message: 'Form parsing error' });
      }

      const { name, description, region, country } = fields;
      const imageFile = files.image?.[0];

      if (!name || !description || !region || !country || !imageFile) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      try {
        await connectToDatabase('Destination'); // Connect to MongoDB using Mongoose

        const imageData = fs.readFileSync(imageFile.filepath);

        // Create a new destination document
        const newDestination = new Destination({
          name,
          description,
          region,
          country,
          imagePath: imageData.toString('base64'),
          createdAt: new Date(),
        });

        const savedDestination = await newDestination.save();

        return res.status(200).json({ success: true, id: savedDestination._id });
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
