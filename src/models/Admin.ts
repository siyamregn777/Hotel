// models/Admin.ts
import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
}

// Create the schema for the Admin model
const AdminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    lowercase: true, // Normalize to lowercase
    match: /.+\@.+\..+/ // Simple regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Pre-save hook to hash the password for admin
AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the Admin model, specifying the collection name 'admins'
const Admin = models.Admin || model<IAdmin>('Admin', AdminSchema, 'admins'); // Specify collection name here
export default Admin;
