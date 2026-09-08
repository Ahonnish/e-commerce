import mongoose, { Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  },
  { timestamps: true }
);

const categoryModel: Model<ICategory> = mongoose.model<ICategory>(
  'category',
  categorySchema
);


export default categoryModel;