import { Schema, Document, model, models } from 'mongoose';

// Define the interface for reviews
interface IReview {
  userName: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

// Define the interface for the Activity model
export interface IActivity extends Document {
  name: string;
  description: string;
  rate: number;
  reviews: IReview[];
}

// Create the schema for the Activity model
const ActivitySchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  rate: { type: Number, required: true },
  reviews: [
    {
      userName: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 5 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Activity model
const Activity = models.Activity || model<IActivity>('Activity', ActivitySchema, 'active');
export default Activity;