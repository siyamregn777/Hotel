import { Schema, Document, model, models } from 'mongoose';

// Define the interface for the Activity model
export interface IActivity extends Document {
  name: string;
  description: string;
  price: number;
  duration: number;
  createdAt: Date;
}

// Create the schema for the Activity model
const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Activity model, using "active" as the collection name
const Activity = models.Activity || model<IActivity>('Activity', ActivitySchema, 'active');
export default Activity;