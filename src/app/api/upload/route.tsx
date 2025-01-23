import connectToDatabase from '../../../../lib/mongodb'; // Adjust the path as necessary
import Image from '../../../models/Image'; // Import Image model
import formidable, { IncomingForm, Fields, Files } from 'formidable'; // Import formidable types
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http'; // Import IncomingMessage from http

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  await connectToDatabase('myDatabase'); // Connect to your database

  const form = new IncomingForm();

  return new Promise<Response>((resolve) => {
    // Cast req to the correct type for formidable
    const incomingMessage = req as unknown as IncomingMessage;

    form.parse(incomingMessage, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error("Error parsing the file:", err);
        return resolve(new Response(
          JSON.stringify({ success: false, message: 'Error uploading file.' }),
          { status: 500 }
        ));
      }

      const fileArray = files.file as formidable.File[]; // Cast to File array
      if (!fileArray || fileArray.length === 0) {
        return resolve(new Response(
          JSON.stringify({ success: false, message: 'No file uploaded.' }),
          { status: 400 }
        ));
      }

      const file = fileArray[0]; // Get the first file
      const uploadPath = path.join(process.cwd(), 'uploads', file.originalFilename || file.newFilename); // Use originalFilename or newFilename

      // Ensure the uploads directory exists
      fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

      try {
        await fs.promises.rename(file.filepath, uploadPath); // Move the file to the upload path

        // Create a new Image instance
        const newImage = new Image({
          filename: file.originalFilename || file.newFilename, // Use originalFilename or newFilename
          path: uploadPath,
        });

        // Save the image metadata to the database
        await newImage.save(); // Use the Image model's save method
        return resolve(new Response(
          JSON.stringify({ success: true, imageId: newImage._id }),
          { status: 201 }
        ));
      } catch (error) {
        console.error("Error saving file or metadata:", error);
        return resolve(new Response(
          JSON.stringify({
            success: false,
            message: error instanceof Error ? error.message : 'An unknown error occurred',
          }),
          { status: 500 }
        ));
      }
    });
  });
}