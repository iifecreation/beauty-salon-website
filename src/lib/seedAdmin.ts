// lib/seedAdmin.ts
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/security"; // assume you have a password hasher

export async function seedDefaultAdmin() {
  await dbConnect();

  const existingAdmin = await User.findOne({ email: "admin@laluna.com" });

  if (existingAdmin) {
    console.log("✅ Default admin already exists");
    return;
  }

  const hashedPassword = await hashPassword("1234567890");

  const admin = new User({
    email: "admin@laluna.com",
    password: hashedPassword,
    name: "Default Admin",
    role: "admin",
    phone: "+1234567890",
  });

  await admin.save();

  console.log("✅ Default admin created");
}
