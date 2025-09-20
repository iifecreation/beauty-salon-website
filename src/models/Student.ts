import mongoose, { Schema, Document, Types } from "mongoose";
import { ICourse } from "./Course";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone?: string;
  enrolledCourses: Types.ObjectId[] | ICourse[];
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course", // ✅ Connects to Course model
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
