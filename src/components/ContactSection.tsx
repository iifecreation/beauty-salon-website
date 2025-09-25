"use client";

import { Mail, MapPinHouse, Phone } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Zod schema for validation (matches backend)
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["service", "training"], { message: "Inquiry type is required" }),
  serviceType: z.string().optional(),
});

const inquiryTypes = [
  { value: "service", label: "Service" },
  { value: "training", label: "Training" },
];

const serviceTypes = [
  { value: "makeup", label: "Makeup" },
  { value: "pedicure", label: "Pedicure" },
  { value: "manicure", label: "Manicure" },
  { value: "nail-fixing", label: "Nail Fixing" },
];

const ContactSection = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "service",
      serviceType: "",
    },
  });

  const inquiryType = watch("inquiryType");

  const onSubmit = async (data: any) => {
    setApiError(null);
    setApiSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        const errorMsg = Array.isArray(result.error) ? result.error.join(", ") : result.error || "Something went wrong";
        setApiError(errorMsg);
        toast.error(errorMsg);
      } else {
        setApiSuccess("Your message has been sent! We'll get back to you soon.");
        toast.success("Your message has been sent! We'll get back to you soon.");
        reset();
      }
    } catch (err: any) {
      let message = err?.response?.data?.error || err?.response?.data?.message
      setApiError(message || "Network error. Please try again later.");
      toast.error(message || "Network error. Please try again later.");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col-reverse gap-12 justify-center items-center">
        {/* Left: Form */}
        <div className="w-full md:w-3/5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-800">Name</label>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Your Name"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
            </div>

            {/* Email & Phone Row */}
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label htmlFor="email" className="block text-lg font-medium text-gray-800">E-mail</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Insert Your E-mail"
                  className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
              </div>
              <div className="flex-1 mt-5 md:mt-0">
                <label htmlFor="phone" className="block text-lg font-medium text-gray-800">Phone (optional)</label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="Your Phone Number"
                  className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-lg font-medium text-gray-800">Subject (optional)</label>
              <input
                id="subject"
                type="text"
                {...register("subject")}
                placeholder="Subject"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
              />
            </div>

            {/* Inquiry Type & Service Type Row */}
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <label htmlFor="inquiryType" className="block text-lg font-medium text-gray-800">Inquiry Type</label>
                <select
                  id="inquiryType"
                  {...register("inquiryType")}
                  className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 focus:border-black focus:outline-none"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message as string}</p>}
              </div>
              {inquiryType === "service" && (
                <div className="flex-1 mt-5 md:mt-0">
                  <label htmlFor="serviceType" className="block text-lg font-medium text-gray-800">Service Type (optional)</label>
                  <select
                    id="serviceType"
                    {...register("serviceType")}
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 focus:border-black focus:outline-none"
                  >
                    <option value="">Select Service</option>
                    {serviceTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-800">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                placeholder="Insert a Message"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none resize-none"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>}
            </div>

            {apiError && <div className="text-red-600 text-sm text-center">{apiError}</div>}
            {apiSuccess && <div className="text-green-600 text-sm text-center">{apiSuccess}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 rounded-2xl bg-test-brown-800 text-white text-lg font-medium hover:bg-test-brown-800/80 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-3/5 mx-auto">
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-center">
            Have Questions?
            <br />
            <span className="font-medium">We Have Answers!</span>
          </h2>
          <p className="mt-6 text-gray-500 text-center">
            We’re here to help with all things beauty — from makeup sessions to pedicures,
            manicures, and nail fixing. Reach out for bookings, product questions, or special
            events.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 mt-10 text-gray-600 justify-center">
            <div className="flex items-center gap-3">
              <Phone />
              <span className="text-base font-medium">+123-456-7890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail />
              <span className="text-base font-medium">hello@laluna.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPinHouse />
              <span className="text-base font-medium">123 Beauty Street, City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit + Extra Text */}
      <div className="flex flex-col items-center justify-center gap-8 mt-12 w-full md:w-3/5 mx-auto ">
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed text-center">
          Our team will respond to your inquiry within 24 hours. Whether it’s about booking a
          nail appointment, getting advice on makeup products, or joining our community, we’re
          excited to hear from you!
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
