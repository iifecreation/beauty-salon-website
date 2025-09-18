// models/Payment.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  itemType: "Course" | "Product" | "Service";
  itemId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  method: "Card" | "Transfer" | "Wallet" | "Cash";
  status: "Pending" | "Success" | "Failed" | "Refunded";
  transactionId: string;
  description?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemType: { type: String, enum: ["Course", "Product", "Service"], required: true },
    itemId: { type: Schema.Types.ObjectId, required: true }, // reference to the specific item
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    method: { type: String, enum: ["Card", "Transfer", "Wallet", "Cash"], required: true },
    status: { type: String, enum: ["Pending", "Success", "Failed", "Refunded"], default: "Pending" },
    transactionId: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
