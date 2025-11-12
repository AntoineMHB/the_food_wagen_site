"use client";

import { Food } from "@/types/Food";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import FoodCard from "./FoodCard";
import EditMealForm from "./EditMealForm";
import DeleteForm from "./DeleteForm";

const ITEMS_PER_ROW = 4;
const INITIAL_ROWS = 2;
const INITIAL_ITEMS = ITEMS_PER_ROW * INITIAL_ROWS;

interface FeaturedFoodsProps {
  searchQuery: string;
}

export default function FeaturedFoods({ searchQuery }: FeaturedFoodsProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track which form to show

  useEffect(() => {
    fetchFoods();
  }, [searchQuery]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `https://6852821e0594059b23cdd834.mockapi.io/Food?name=${encodeURIComponent(
            searchQuery
          )}`
        : "https://6852821e0594059b23cdd834.mockapi.io/Food";

      const response = await fetch(url);

      if (response.status === 404) {
        setFoods([]);
        setError(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }

      const data = await response.json();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (food: Food) => {
    setSelectedFood(food);
    setIsEditMode(true);
  };

  const handleOpenDelete = (food: Food) => {
    setSelectedFood(food);
    setIsEditMode(false);
  };

  const handleClose = () => {
    setSelectedFood(null);
    setIsEditMode(false);
  };

  const displayedFoods = showAll ? foods : foods.slice(0, INITIAL_ITEMS);
  const hasMore = foods.length > INITIAL_ITEMS;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Featured Meals</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Featured Meals</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-center pt-5 pb-10 font-bold text-4xl">
        Featured Meals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onOpenEdit={() => handleOpenEdit(food)}
            onOpenDelete={() => handleOpenDelete(food)}
          />
        ))}
      </div>

      {/* Show Edit form only when in edit mode */}
      {selectedFood && isEditMode && (
        <EditMealForm onClose={handleClose} food={selectedFood} />
      )}

      {/* Show Delete form only when NOT in edit mode */}
      {selectedFood && !isEditMode && (
        <DeleteForm food={selectedFood} onClose={handleClose} />
      )}

      {hasMore && !showAll && (
        <div className="text-center mt-8">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-amber-600"
            onClick={() => setShowAll(true)}
          >
            Load More
          </Button>
        </div>
      )}

      {showAll && (
        <div className="text-center mt-8">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-amber-600"
            onClick={() => setShowAll(false)}
          >
            Load Less
          </Button>
        </div>
      )}
    </div>
  );
}
