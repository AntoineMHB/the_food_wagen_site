import { Food } from "@/types/Food";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface FoodCardProps {
  food: Food;
}

const normalizedFoodData = (food: Food) => ({
  id: food.id,
  food_name: food.food_name || food.name || "Unnamed Food",
  food_image:
    food.food_image ||
    food.image ||
    food.imageUrl ||
    food.avatar ||
    "/Logo.png",
  price: food.price || food.Price || "N/A",
  food_rating: Number(food.food_rating || food.rating || 0),
  restaurant_name:
    food.restaurant_name || food.restaurant?.name || "Unkwown Restaurant",
  restaurant_logo:
    food.restaurant_logo ||
    food.logo ||
    food.restaurant?.logo ||
    food.restaurant_image ||
    "/Logo.png",
  restaurant_status:
    food.restaurant_status || food.restaurant?.status || "Unknown",
});

export default function FoodCard({ food }: FoodCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const normalized = normalizedFoodData(food);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Image with its price badge */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={normalized.restaurant_logo}
          alt={normalized.restaurant_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-md flex items-center gap-1">
          <span>🏷️</span>
          <span className="font-semibold">${food.price}</span>
        </div>
      </div>

      {/* content */}
      <div className="p-4">
        {/* Restaurant info and menu */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={normalized.restaurant_logo}
                alt={normalized.restaurant_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">{food.food_name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600">
                  {normalized.food_rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Three dots menu */}
          <div className="relative">
            <Button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <span className="text-gray-600">⋮</span>
            </Button>

            {showMenu && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 min-w-[100px]">
                <Button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Edit
                </Button>
                <Button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-3">
          <span
            className={`inline-block px-4 py-1 rounded-md test-sm font-medium ${
              food.restaurant_status === "Open Now"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {food.restaurant_status}
          </span>
        </div>
      </div>
    </div>
  );
}
