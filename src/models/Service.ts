// models/Service.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "2 hours"
  category: "Makeup" | "Hair" | "Pedicure" | "Manicure" | "Nails";
  image: string;
  imageId?: string;
  location: string
  content: string
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    content: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["Makeup", "Hair", "Pedicure", "Manicure", "Nails"], 
      required: true 
    },
    image: { type: String, required: true },
    imageId: { type: String },  // store Cloudinary public_id for deletion
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
