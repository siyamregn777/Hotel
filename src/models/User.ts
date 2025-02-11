import { Schema, Document, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create the schema for the User model
const UserSchema: Schema = new Schema({
  firstName: {
     type: String, 
     required: true
     },
    lastName: {
       type: String, 
       required: true
       },
  username: {
    type: String,
    required: true,
    unique: true, 
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

// Pre-save hook to hash the password
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model, specifying the collection name 'users'
const User = models.User || model<IUser>('User', UserSchema, 'users'); // Specify collection name here
export default User;