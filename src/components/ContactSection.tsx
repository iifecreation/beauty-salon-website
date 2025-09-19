"use client";

import { Mail, MapPinHouse, Phone } from "lucide-react";
import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    product: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Form */}
        <div className="w-full md:w-2/5">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Insert Your E-mail"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
                required
              />
            </div>

            {/* Product */}
            <div>
              <label htmlFor="product" className="block text-lg font-medium text-gray-800">
                Product
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none"
                required
              >
                <option value="">Select Product</option>
                <option value="makeup">Makeup</option>
                <option value="pedicure">Pedicure</option>
                <option value="manicure">Manicure</option>
                <option value="nail-fixing">Nail Fixing</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Insert a Message"
                rows={5}
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-gray-300 text-gray-600 placeholder-gray-400 focus:border-black focus:outline-none resize-none"
                required
              />
            </div>
          </form>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-3/5">
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Have Questions?
            <br />
            <span className="font-medium">We Have Answers!</span>
          </h2>
          <p className="mt-6 text-gray-500">
            We’re here to help with all things beauty — from makeup sessions to pedicures,
            manicures, and nail fixing. Reach out for bookings, product questions, or special
            events.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 mt-10 text-gray-600">
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
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12">
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const form = document.querySelector("form") as HTMLFormElement;
            if (form) {
              form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
            }
          }}
          className="px-10 py-4 rounded-2xl bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
          Our team will respond to your inquiry within 24 hours. Whether it’s about booking a
          nail appointment, getting advice on makeup products, or joining our community, we’re
          excited to hear from you!
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
