// models/Course.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  name: string; // Name of person booking
  email: string; // Contact info
  phone?: string;
  service: Types.ObjectId; // Reference to Service
  bookingDate: Date;
  preferredMode: "Online" | "Physical";
  location?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: { type: String },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service", // Or "Course" if you're reusing the Course model
      required: true,
    },

    bookingDate: { type: Date, required: true },

    preferredMode: {
      type: String,
      enum: ["Online", "Physical"],
      required: true,
    },

    location: { type: String },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    notes: { type: String },
  },
  { timestamps: true }
);


export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
