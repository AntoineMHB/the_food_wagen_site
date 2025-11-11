"use client";

import { useState } from "react";
import { Form } from "./ui/form";

interface PopupFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  avatar: string;
  rating: string;
  open: string;
  logo: string;
  restaurant_name: string;
}

export default function PopupForm({ onClose }: PopupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    avatar: "",
    rating: "",
    open: "",
    logo: "",
    restaurant_name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://6852821e0594059b23cdd834.mockapi.io/Food",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);

      setFormData({
        name: "",
        avatar: "",
        rating: "",
        open: "",
        logo: "",
        restaurant_name: "",
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-0">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#FF9A0E] text-center">
          Add a meal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="pl-[50px] pr-[50px]">
            <input
              name="name"
              required
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Food name"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="rating"
              required
              type="text"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Food rating"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="avatar"
              required
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Food image (link)"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="restaurant_name"
              required
              type="text"
              value={formData.restaurant_name}
              onChange={handleChange}
              placeholder="Restaurant name"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="logo"
              required
              type="text"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Restaurant logo (link)"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <select
              name="restaurantStatus"
              id="restaurantStatus"
              value={formData.open}
              onChange={handleChange}
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-black text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled hidden>
                Restaurant status (open/close)
              </option>
              <option value="open" className="text-black">
                Open
              </option>
              <option value="close" className="text-red-600">
                Close
              </option>
            </select>
          </div>

          <div className="pl-[50px] flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
