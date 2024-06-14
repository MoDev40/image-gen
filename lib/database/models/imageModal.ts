import { Document, Model, Schema, model, models } from "mongoose";

export interface ImageDocument extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string; 
  width?: number;
  height?: number;
  config?: object; 
  transformedUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  transformedUrl: { type: String },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true});

const Image = models.Image || model('Image', ImageSchema);

export default Image as Model<ImageDocument>;