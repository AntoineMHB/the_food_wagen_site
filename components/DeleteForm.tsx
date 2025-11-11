"use client";

import { Food } from "@/types/Food";

interface PopupFormProps {
  onClose: () => void;
  food: Food;
}

export default function DeleteForm({ onClose, food }: PopupFormProps) {
  const handleDelete = async () => {
    if (!food.id) return;

    try {
      const response = await fetch(
        `https://6852821e0594059b23cdd834.mockapi.io/Food/${food.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      alert("Item deleted successfully!");

      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Something went wrong while deleting.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-0">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#FF9A0E] text-center">
          Delete Meal
        </h2>

        <div className="text-center text-[#9E9E9E] text-[14px]">
          <p>
            Are you sure you want to delete this meal? Actions cannot be
            reversed.
          </p>
        </div>

        <div className="pr-[50px] pl-[50px] pt-5 flex flex-items space-x-3">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 font-bold bg-[linear-gradient(97.86deg,#FFBA26_-8.95%,#FF9A0E_109.24%)] text-white rounded-lg hover:bg-amber-500 transition w-[301px] shadow-amber-400"
          >
            Yes
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#FFBA26]  font-bold rounded-lg  hover:bg-gray-100 transition w-[300px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
