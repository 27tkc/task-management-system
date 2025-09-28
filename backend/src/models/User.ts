// backend/src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'MANAGER', 'USER'], default: 'USER' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
