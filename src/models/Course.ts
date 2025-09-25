// models/Course.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  content: string;
  category: string;
  price: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  location: "online" | "physical";
  status: "active" | "inactive";
  image: string; // Cloudinary image URL
  imageId: string; // Cloudinary public ID
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    location: {
      type: String,
      enum: ["online", "physical"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active", // ✅ default set to "inactive"
    },
    image: { type: String, required: true },
    imageId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
