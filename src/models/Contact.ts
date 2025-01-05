import { Schema, Document, model, models } from 'mongoose';

// Define the interface for the Contact model
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Create the schema for the Contact model
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Contact model
const Contact = models.Contact || model<IContact>('Contact', ContactSchema, 'cont');
export default Contact;