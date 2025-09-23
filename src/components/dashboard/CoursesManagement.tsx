"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Clock, Users, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "../layouts/RichTextEditor";
import api from "@/lib/api";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


// ✅ Zod Schema
const courseSchema = z.object({
  title: z.string().min(2, "Name is required"),
  category: z.string().min(2, "Category is required"),
  price: z.number().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).refine((val) => !!val, {
    message: "Level is required",
  }),
  location: z.enum(["online", "physical"]).refine((val) => !!val, {
    message: "Location is required",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z.any().optional(),
});

type CourseForm = z.infer<typeof courseSchema> & {
  _id?: string;
  students?: number;
  status?: string;
  image?: string;
};

const CoursesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseForm | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);


  // ✅ React Hook Form with Zod
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      duration: "",
      level: "Beginner",
      description: "",
      content: "",
      location: "online",
    },
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/courses");
      
      const courseList = Array.isArray(res.data) ? res.data : res.data.data;
      setCourses(courseList || []);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Reset form when editing
  useEffect(() => {
    if (editingCourse) {
      reset(editingCourse);
      setPreview(editingCourse.image || null);
    } else {
      reset();
      setPreview(null);
      setFile(null);
    }
  }, [editingCourse, reset]);

  // ✅ Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  // ✅ Edit
  const handleEdit = (course: CourseForm) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  // ✅ Delete
  const handleDelete = async (id?: string | null) => {
    if (!id) return;
    try {
      await api.delete(`/admin/courses?id=${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // ✅ Submit
  const onSubmit = async (data: CourseForm) => {
    setFetchLoading(true)
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });
      if (file) formData.append("image", file);

      if (editingCourse?._id) {
        const res = await api.put(`/admin/courses?id=${editingCourse._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course updated successfully");
      } else {
        
        await api.post("/admin/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course added successfully");
      }

      setShowForm(false);
      setEditingCourse(null);
      reset();
      setFile(null);
      setPreview(null);
      fetchCourses();
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message)
      console.error("Failed to submit", err);
    }
    finally {
      setFetchLoading(false)
    }
  };

  return (
    <div className="p-8 max-md:p-4">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light">Courses Management</h1>
          <p className="text-muted-foreground">
            Manage your beauty courses and training programs
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCourse(null);
          }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* loading */}
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-40">
                  <Loader className="animate-spin w-10 h-10 text-primary" />
                </div>}

      {/* empty state */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No courses found. Try adding a new one.</p>
        </div>
      )}

      {/* grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-card border rounded p-6">
            {course.image && (
              <img
                src={course.image}
                alt={course.title ?? "Course"}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <div className="flex justify-between mb-4">
              <span className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {course.status || "Draft"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="p-2 text-primary hover:bg-primary/10 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => setDeleteId(course._id ?? null)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently delete the course. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          handleDelete(deleteId);
                          setDeleteId(null);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
            <h3 className="text-lg font-medium">{course.title ?? "Untitled"}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {course.category} • {course.level}
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium">{course.price}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> Duration
                </div>
                <span className="text-sm">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" /> Students
                </div>
                <span className="text-sm">{course.students || 0}</span>
              </div>
            </div>
            <button className="w-full bg-accent text-accent-foreground py-2 rounded">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-medium mb-4">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
              {/* name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  {...register("title")}
                  placeholder="Enter course name"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  {...register("category")}
                  className="w-full p-3 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select category</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Eyebrows">Eyebrows</option>
                  <option value="Facial">Facial</option>
                  <option value="Facial">Hair</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  {...register("location")}
                  className="w-full p-2 border rounded bg-background"
                >
                  <option value="">Select location</option>
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* price */}
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Enter price (e.g. 200)"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* duration */}
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  {...register("duration")}
                  placeholder="Enter duration (e.g. 6 weeks)"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* level */}
              <div>
                <label className="block text-sm font-medium mb-2">Level</label>
                <select
                  {...register("level")}
                  className="w-full p-2 border rounded bg-background"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>

              {/* description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Write a short description of the course"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* image */}
              <div>
                <label className="block text-sm font-medium mb-2">Course Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded bg-background"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded border"
                  />
                )}
              </div>

              {/* content */}
              <div>
                <label className="block text-sm font-medium mb-2">Course Content</label>
                <RichTextEditor
                  value={watch("content") || ""}
                  placeholder="Enter detailed course content..."
                  onChange={(content) => setValue("content", content)}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border py-3 rounded hover:bg-accent/10"
                >
                  Cancel
                </button>
                <button
                  disabled={fetchLoading}
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {fetchLoading && (
                    <Loader className="animate-spin w-5 h-5" />
                  )}
                  {editingCourse ? "Update" : "Add"} Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
