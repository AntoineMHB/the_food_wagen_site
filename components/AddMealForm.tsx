"use client";

import { useState } from "react";
import { Form } from "./ui/form";

interface PopupFormProps {
  onClose: () => void;
}

export default function PopupForm({ onClose }: PopupFormProps) {
  const [restaurantStatus, setRestaurantStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              required
              type="text"
              placeholder="Food name"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              required
              type="text"
              placeholder="Food rating"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              required
              type="text"
              placeholder="Food image (link)"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              required
              type="text"
              placeholder="Restaurant name"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <input
              required
              type="text"
              placeholder="Restaurant logo (link)"
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pl-[50px] pr-[50px]">
            <select
              name="restaurantStatus"
              id="restaurantStatus"
              value={restaurantStatus}
              onChange={(e) => setRestaurantStatus(e.target.value)}
              className="w-full h-10  bg-[#F5F5F5] text-[#9E9E9E] text-[15px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
