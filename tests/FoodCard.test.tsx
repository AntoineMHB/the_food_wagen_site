import { render, screen, fireEvent } from "@testing-library/react";
import FoodCard from "@/components/FoodCard";
import { Food } from "@/types/Food";
import React from "react";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("FoodCard - Render Props Verification", () => {
  const mockOnOpenEdit = jest.fn();
  const mockOnOpenDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFood: Food = {
    id: "1",
    food_name: "Margherita Pizza",
    name: "Margherita Pizza",
    food_image: "pizza.jpg",
    image: "pizza.jpg",
    price: 12.99,
    Price: 12.99,
    food_rating: 4.5,
    rating: 4.5,
    restaurant_name: "Italian Kitchen",
    restaurant_logo: "restaurant-logo.jpg",
    logo: "restaurant-logo.jpg",
    restaurant_status: "Open Now",
  };

  it("should render food name correctly", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();
  });

  it("should render food price correctly", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("$12.99")).toBeInTheDocument();
  });

  it("should render food rating correctly", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("should render restaurant status correctly when Open Now", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    const statusBadge = screen.getByText("Open Now");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-green-100", "text-green-700");
  });

  it("should render restaurant status correctly when Closed", () => {
    const closedFood: Food = {
      ...mockFood,
      restaurant_status: "Closed",
    };

    render(
      <FoodCard
        food={closedFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    const statusBadge = screen.getByText("Closed");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-red-100", "text-red-700");
  });

  it("should render all expected props: name, price, rating, and status", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    // Verify name
    expect(screen.getByText("Margherita Pizza")).toBeInTheDocument();

    // Verify price
    expect(screen.getByText("$12.99")).toBeInTheDocument();

    // Verify rating
    expect(screen.getByText("4.5")).toBeInTheDocument();

    // Verify status
    expect(screen.getByText("Open Now")).toBeInTheDocument();
  });

  it("should handle fallback values when optional fields are missing", () => {
    const minimalFood: Food = {
      id: "2",
      logo: "default-logo.jpg",
    };

    render(
      <FoodCard
        food={minimalFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    // Should use fallback values
    expect(screen.getByText("Unnamed Food")).toBeInTheDocument();
    expect(screen.getByText("$N/A")).toBeInTheDocument();
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("should render food name from food_name field", () => {
    const foodWithFoodName: Food = {
      ...mockFood,
      food_name: "Pepperoni Pizza",
      name: undefined,
    };

    render(
      <FoodCard
        food={foodWithFoodName}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("Pepperoni Pizza")).toBeInTheDocument();
  });

  it("should render food name from name field when food_name is missing", () => {
    const foodWithName: Food = {
      ...mockFood,
      food_name: undefined,
      name: "Hawaiian Pizza",
    };

    render(
      <FoodCard
        food={foodWithName}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("Hawaiian Pizza")).toBeInTheDocument();
  });

  it("should render price from price field", () => {
    const foodWithPrice: Food = {
      ...mockFood,
      price: 15.99,
      Price: undefined,
    };

    render(
      <FoodCard
        food={foodWithPrice}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("$15.99")).toBeInTheDocument();
  });

  it("should render price from Price field when price is missing", () => {
    const foodWithCapitalPrice: Food = {
      ...mockFood,
      price: undefined,
      Price: 18.5,
    };

    render(
      <FoodCard
        food={foodWithCapitalPrice}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("$18.50")).toBeInTheDocument();
  });

  it("should render rating from food_rating field", () => {
    const foodWithFoodRating: Food = {
      ...mockFood,
      food_rating: 4.8,
      rating: undefined,
    };

    render(
      <FoodCard
        food={foodWithFoodRating}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("should render rating from rating field when food_rating is missing", () => {
    const foodWithRating: Food = {
      ...mockFood,
      food_rating: undefined,
      rating: 3.9,
    };

    render(
      <FoodCard
        food={foodWithRating}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("3.9")).toBeInTheDocument();
  });

  it("should format rating to one decimal place", () => {
    const foodWithRating: Food = {
      ...mockFood,
      food_rating: 4.567,
    };

    render(
      <FoodCard
        food={foodWithRating}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("should render restaurant images correctly", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    const images = screen.getAllByAltText("Italian Kitchen");
    expect(images).toHaveLength(2); // Main image and logo
    images.forEach((img) => {
      expect(img).toHaveAttribute("src", "restaurant-logo.jpg");
    });
  });

  it("should render star emoji for rating", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("should render price badge emoji", () => {
    render(
      <FoodCard
        food={mockFood}
        onOpenEdit={mockOnOpenEdit}
        onOpenDelete={mockOnOpenDelete}
      />
    );

    expect(screen.getByText("🏷️")).toBeInTheDocument();
  });
});
