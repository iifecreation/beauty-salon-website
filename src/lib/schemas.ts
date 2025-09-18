import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  price: z.number().nonnegative(),
  duration: z.string().min(1),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  image: z.string().url()
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  category: z.enum(["Makeup", "Hair", "Pedicure", "Manicure", "Nails"]),
  stock: z.number().int().nonnegative(),
  image: z.string().url()
});

export const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  duration: z.string().min(1),
  category: z.enum(["Makeup", "Hair", "Pedicure", "Manicure", "Nails"]),
  image: z.string().url()
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
