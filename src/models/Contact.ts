// src/models/Contact.ts
import { Schema, Document, model, models } from 'mongoose';

// Define the interface for the Contact model
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create the schema for the Contact model
const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true, // Normalize email to lowercase
    match: /.+\@.+\..+/, // Simple regex for email validation
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create and export the Contact model
const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;