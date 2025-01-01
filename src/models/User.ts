// src/models/User.ts
import { Schema, Document, model, models } from 'mongoose';

// Define the interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create the schema for the User model
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
const User = models.User || model<IUser>('User', UserSchema);

export default User;
