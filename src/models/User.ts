import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;

  resetPasswordTokenHash?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
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
    resetPasswordTokenHash: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      default: 'customer',
    },
  },
  { timestamps: true }
);

const userModel: Model<IUser> = mongoose.model<IUser>('user', userSchema);

export default userModel;
