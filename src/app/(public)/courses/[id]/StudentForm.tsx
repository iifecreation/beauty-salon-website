"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  profileImage: z.any().optional(),
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      let profileImageUrl = null;
      if (data.profileImage && data.profileImage.length > 0) {
        // You may want to upload the file to your server or cloud storage here
        // For now, just skip file upload logic
        profileImageUrl = null;
      }
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, profileImage: profileImageUrl, enrolledCourses: [courseId] }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
      setImagePreview(null);
      reset();
      onSuccess?.();
    } catch (err) {
      const error = err as Error;
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setValue("profileImage", undefined);
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
          <label className="block mb-1 font-medium">Profile Image <span className="text-gray-400 text-xs">(optional)</span></label>
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="profileImage" className="w-full cursor-pointer border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-4 hover:border-warm-brown-800 transition">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-2" width={100}
                  height={100} />
              ) : (
                <span className="text-gray-400">Click to upload or drag and drop</span>
              )}
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {errors.profileImage?.message && <p className="text-red-500 text-sm mt-1">{String(errors.profileImage.message)}</p>}
          </div>
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
      <button type="submit" className="bg-warm-brown-800 hover:bg-warm-brown-800/80 rounded-full text-primary-foreground px-6 py-2 transition w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
