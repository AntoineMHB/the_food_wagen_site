"use client";

import { useState } from "react";
import { Form } from "./ui/form";
import { Food } from "@/types/Food";

interface PopupFormProps {
  onClose: () => void;
  food: Food;
}

interface FormData {
  name: string;
  avatar: string;
  rating: string;
  open: string;
  logo: string;
  restaurant_name: string;
}

export default function PopupForm({ onClose, food }: PopupFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    avatar: "",
    rating: "",
    open: "",
    logo: "",
    restaurant_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://6852821e0594059b23cdd834.mockapi.io/Food/${food.id}`,
        {
          method: "PUT",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-0">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#FF9A0E] text-center">
          Edit Meal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="pl-[50px] pr-[50px]">
            <input
              name="name"
              required
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Food name"
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="rating"
              required
              type="text"
              value={formData.rating}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Food rating"
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="avatar"
              required
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Food image (link)"
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="restaurant_name"
              required
              type="text"
              value={formData.restaurant_name}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Restaurant name"
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              name="logo"
              required
              type="text"
              value={formData.logo}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Restaurant logo (link)"
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <select
              name="open"
              id="restaurantStatus"
              value={formData.open}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-10 bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="pr-[50px] pl-[50px] flex flex-items space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 font-bold bg-[linear-gradient(97.86deg,#FFBA26_-8.95%,#FF9A0E_109.24%)] text-white rounded-lg hover:bg-amber-500 transition w-[301px] shadow-amber-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Updating Food...</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-white border border-[#FFBA26] font-bold rounded-lg hover:bg-gray-100 transition w-[300px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
