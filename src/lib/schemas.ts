import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  content: z.string().min(10),
  category: z.string().min(3),
  price: z.string().min(3),
  duration: z.string().min(1),
  location: z.enum(["online", "physical"]),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

export const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  duration: z.string().min(1),
  category: z.enum(["Makeup", "Hair", "Pedicure", "Manicure", "Nails"]),
  location: z.string().min(1),
  content: z.string().min(1),
});

export const paymentSchema = z.object({
  userId: z.string().min(1),
  itemType: z.enum(["Course", "Product", "Service"]),
  itemId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().min(2).max(6),
  method: z.enum(["Card", "Transfer", "Wallet", "Cash"]),
  status: z.enum(["Pending", "Success", "Failed", "Refunded"]),
  transactionId: z.string().min(3),
  description: z.string().optional()
});
