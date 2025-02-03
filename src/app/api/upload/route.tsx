import connectToDatabase from '../../../../lib/mongodb'; // Adjust the path as necessary
import { GridFSBucket } from 'mongodb';
import formidable, { IncomingForm, Fields, Files } from 'formidable'; // Import formidable types
import fs from 'fs'; // Import fs
import { IncomingMessage } from 'http'; // Import IncomingMessage from http

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: Request) {
  const mongoose = await connectToDatabase('myDatabase'); // Connect to your database
  const db = mongoose.connection.getClient().db('myDatabase'); // Get the underlying Db instance from the Mongoose connection
  const bucket = new GridFSBucket(db); // Create a GridFS bucket

  const form = new IncomingForm();

  return new Promise<Response>((resolve) => {
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
      const uploadStream = bucket.openUploadStream(file.originalFilename || file.newFilename); // Create upload stream

      // Pipe the file data to GridFS
      const readStream = fs.createReadStream(file.filepath);
      readStream.pipe(uploadStream);

      uploadStream.on('error', (error: Error) => {
        console.error("Error uploading to GridFS:", error);
        return resolve(new Response(
          JSON.stringify({ success: false, message: 'Error uploading file.' }),
          { status: 500 }
        ));
      });
      uploadStream.on('finish', async () => {
        const newImage = {
          filename: file.originalFilename || file.newFilename,
          contentType: file.mimetype,
          uploadDate: new Date(),
          length: file.size,
          id: uploadStream.id,
        };
        await db.collection('images').insertOne(newImage);
        return resolve(new Response(
          JSON.stringify({ success: true, imageId: newImage.id }),
          { status: 201 }
        ));
      });
    });
  });
}