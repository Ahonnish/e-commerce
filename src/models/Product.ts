import mongoose, { Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  images: string[];
  sku: string;
  ratingsAverage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productModel: Model<IProduct> = mongoose.model<IProduct>(
  'product',
  productSchema
);

export default productModel;