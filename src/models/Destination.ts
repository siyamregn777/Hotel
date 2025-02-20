import mongoose, { Document, Schema } from 'mongoose';

interface IDestination extends Document {
  name: string;
  description: string;
  region: string;
  country: string;
  imagePath?: string; // Cloudinary URL or fallback image
  createdAt: Date;
}

const destinationSchema = new Schema<IDestination>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  imagePath: { type: String, required: false }, // Stores Cloudinary URL
  createdAt: { type: Date, default: Date.now },
});

const Destination =
  mongoose.models.Destination ||
  mongoose.model<IDestination>('Destination', destinationSchema);

export default Destination;