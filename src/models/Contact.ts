import mongoose, { Schema, Document, models } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: 'training' | 'service';
  serviceType?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true },
    inquiryType: {
      type: String,
      enum: ['training', 'service'],
      required: true,
    },
    serviceType: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
