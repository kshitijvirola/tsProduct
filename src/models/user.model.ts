import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<User>('User', userSchema);
