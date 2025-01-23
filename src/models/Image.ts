import { Schema, Document, model, models } from 'mongoose';

// Define the interface for the Image model
export interface IImage extends Document {
  filename: string;
  path: string;
  uploadedAt: Date;
}

// Create the schema for the Image model
const ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
    trim: true,
  },
  path: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Image model
const Image = models.Image || model<IImage>('Image', ImageSchema, 'images'); // 'images' is the collection name
export default Image;