"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  profileImage: z.string().url().optional(),
  educationLevel: z.string().optional(),
  guardianName: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
  preferredMode: z.enum(["Online", "Physical"]),
});

type FormData = z.infer<typeof schema>;

export default function StudentForm({ courseId, onSuccess }: { courseId: string; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, enrolledCourses: [courseId] }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input {...register("name")}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input {...register("email")}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input {...register("phone")}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input {...register("address")}
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")}
            placeholder="Select your date of birth"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select {...register("gender")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Image URL</label>
          <input {...register("profileImage")}
            placeholder="Profile image URL"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Education Level</label>
          <input {...register("educationLevel")}
            placeholder="Education level"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Guardian Name</label>
          <input {...register("guardianName")}
            placeholder="Guardian name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.guardianName && <p className="text-red-500 text-sm mt-1">{errors.guardianName.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Emergency Contact</label>
          <input {...register("emergencyContact")}
            placeholder="Emergency contact"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Notes</label>
          <textarea {...register("notes")}
            placeholder="Additional notes"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
          {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Preferred Mode</label>
          <select {...register("preferredMode")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
          </select>
          {errors.preferredMode && <p className="text-red-500 text-sm mt-1">{errors.preferredMode.message}</p>}
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Registration successful!</div>}
      <button type="submit" className="bg-test-brown-800 hover:bg-test-brown-800/80 rounded-full text-primary-foreground px-6 py-2 transition w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
