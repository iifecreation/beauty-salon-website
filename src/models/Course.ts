// models/Course.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  content: string;
  category: string;
  price: number;
  duration: string; // e.g., "3 weeks"
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string; // image URL
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
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
