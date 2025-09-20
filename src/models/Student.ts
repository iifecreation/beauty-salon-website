import mongoose, { Schema, Document, Types } from "mongoose";
import { ICourse } from "./Course";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: "Male" | "Female" | "Other";
  profileImage?: string;
  educationLevel?: string;
  guardianName?: string;
  emergencyContact?: string;
  notes?: string;
  isActive: boolean;
  preferredMode: "Online" | "Physical";
  enrolledCourses: Types.ObjectId[] | ICourse[];
  createdAt: Date;
  updatedAt: Date;
}


const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    profileImage: { type: String },
    educationLevel: { type: String },
    guardianName: { type: String },
    emergencyContact: { type: String },
    notes: { type: String },
    isActive: { type: Boolean, default: true },

    preferredMode: {
      type: String,
      enum: ["Online", "Physical"],
      required: true,
    },

    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
