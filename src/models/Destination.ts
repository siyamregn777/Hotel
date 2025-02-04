import mongoose, { Document, Schema } from 'mongoose';

interface IDestination extends Document {
  name: string;
  description: string;
  region: string;
  country: string;
  imagePath: string; // Image data stored as base64
  createdAt: Date;
}

const destinationSchema = new Schema<IDestination>({
  name: { 
    type: String,
    required: true 
},
  description: {
     type: String,
      required: true 
    },
  region: { 
    type: String, 
    required: true
 },
  country: { 
    type: String, 
    required: true
 },
  createdAt: { type: Date, default: Date.now },
});

// Ensure to export the model
const Destination = mongoose.models.Destination || mongoose.model<IDestination>('Destination', destinationSchema);

export default Destination;
