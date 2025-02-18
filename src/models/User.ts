import { Schema, Document, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the interface for the User model
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  image: string; // Add image field
}

// Create the schema for the User model
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, default: '/uploads/default.png' }, // Default image path
}, {
  timestamps: true,
});

// Pre-save hook to hash the password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = models.User || model<IUser>('User', UserSchema, 'users');
export default User;