"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Clock, MapPin, Loader, Search } from "lucide-react";
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
import Image from "next/image";

// ✅ Zod Schema
const serviceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(2, "Category is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.enum(["Studio", "Mobile", "Online"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type ServiceForm = z.infer<typeof serviceSchema> & {
  _id?: string;
  status?: string;
  bookings?: number;
  image?: File | string | null;
};

const ServicesManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceForm | null>(null);
  const [services, setServices] = useState<ServiceForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);


  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      duration: "",
      location: "Studio",
      description: "",
      content: "",
    },
  });

  // ✅ Fetch services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/services");
      const serviceList = Array.isArray(res.data) ? res.data : res.data.data;
      console.log(serviceList);
      
      setServices(serviceList || []);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Reset preview when editing
  useEffect(() => {
    if (editingService?.image) {
      // if it's a string (existing URL), use it
      if (typeof editingService.image === "string") {
        setPreviewImage(editingService.image);
      }
    } else {
      setPreviewImage(null);
    }
  }, [editingService]);

  // ✅ Reset form when editing
  useEffect(() => {
    if (editingService) {
      reset(editingService);
    } else {
      reset();
    }
  }, [editingService, reset]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file); // track the file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // ✅ Edit
  const handleEdit = (service: ServiceForm) => {
    setEditingService(service);
    setShowForm(true);
  };

  // ✅ Delete
  const handleDelete = async (id?: string | null) => {
    if (!id) return;
    try {
      await api.delete(`/admin/services?id=${id}`);
      setServices(services.filter((s) => s._id !== id));
      toast.success("Service deleted successfully");
    } catch (err) {
      console.error("Failed to delete service", err);
      toast.error(getErrorMessage(err));
    }
  };

  // ✅ Submit
  const onSubmit = async (data: ServiceForm) => {
    setFetchLoading(true);
    try {
      const formData = new FormData();

      // Append all fields except image
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return;
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Append image file if selected
      // Append the tracked file
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingService?._id) {
        await api.put(`/admin/services?id=${editingService._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service updated successfully");
      } else {
        const res = await api.post("/admin/services", formData , {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
        
        toast.success("Service added successfully");
      }
      setShowForm(false);
      setEditingService(null);
      reset();
      setImageFile(null);
      setPreviewImage(null)
      fetchServices();
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error("Failed to submit service", err);
    } finally {
      setFetchLoading(false);
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-md:p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Manage your beauty services and appointments
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingService(null);
          }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="w-4 h-4" />
        </span>
      </div>

      {/* Loading */}
      {loading && <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-40">
                  <Loader className="animate-spin w-10 h-10 text-primary" />
                </div>}

      {/* Empty State */}
      {!loading && services.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No services found. Try adding a new one.
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-card border border-border rounded p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                {service.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => setDeleteId(service._id ?? null)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently delete the service. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeleteId(null)}>
                        Cancel
                      </AlertDialogCancel>
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

            <h3 className="text-lg font-medium mb-4">{service.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium">{service.price}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> Duration
                </div>
                <span className="text-sm">{service.duration}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> Location
                </div>
                <span className="text-sm">{service.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bookings</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {service.bookings || 0} this month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-medium mb-4">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Service Name</label>
                <input
                  {...register("name")}
                  placeholder="Enter service name"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select {...register("category")} className="w-full p-2 border rounded bg-background">
                  <option value="">Select category</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Nails">Nail Care</option>
                  <option value="Manicure">Manicure</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Eyebrows">Eyebrows</option>
                  <option value="Facial">Facial</option>
                  <option value="Hair">Hair</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input {...register("price")} placeholder="$0.00" className="w-full p-2 border rounded bg-background" />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input {...register("duration")} placeholder="1 hour" className="w-full p-2 border rounded bg-background" />
                  {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select {...register("location")} className="w-full p-2 border rounded bg-background">
                  <option value="">Select location</option>
                  <option value="Studio">Studio</option>
                  <option value="Mobile">Mobile Service</option>
                  <option value="Online">Online</option>
                </select>
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Service description and what's included"
                  className="w-full p-2 border rounded bg-background"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              {/* image */}
              <div>
                <label className="block text-sm font-medium mb-2">Service Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded bg-background"
                />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded border"
                    width={100}
        height={100}
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <RichTextEditor
                  value={watch("content") || ""}
                  placeholder="Enter detailed service content..."
                  onChange={(content) => setValue("content", content)}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border py-3 rounded hover:bg-accent/10">Cancel</button>
                <button type="submit" disabled={fetchLoading} className="flex-1 bg-primary text-primary-foreground py-3 rounded flex items-center justify-center gap-2">
                  {fetchLoading && <Loader className="animate-spin w-5 h-5" />}
                  {editingService ? "Update" : "Add"} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
