import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteForm from "@/components/DeleteForm";
import { Food } from "@/types/Food";
import React from "react";

// Mock window.location.reload
delete (window as any).location;
window.location = { reload: jest.fn() } as any;

// Mock window.alert
global.alert = jest.fn();

// Mock console.error to avoid noise in test output
const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("DeleteForm Component", () => {
  const mockOnClose = jest.fn();
  const mockFood: Food = {
    id: "123",
    food_name: "Margherita Pizza",
    name: "Margherita Pizza",
    price: 12.99,
    logo: "logo.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("should render the delete confirmation modal", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      expect(screen.getByText("Delete Meal")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Are you sure you want to delete this meal? Actions cannot be reversed."
        )
      ).toBeInTheDocument();
    });

    it("should render Yes and No buttons", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
    });

    it("should have correct styling on title", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const title = screen.getByText("Delete Meal");
      expect(title).toHaveClass("text-[#FF9A0E]");
    });

    it("should have modal backdrop", () => {
      const { container } = render(
        <DeleteForm onClose={mockOnClose} food={mockFood} />
      );

      const backdrop = container.firstChild;
      expect(backdrop).toHaveClass("fixed", "inset-0", "bg-black/40");
    });
  });

  describe("User Interactions", () => {
    it("should call onClose when No button is clicked", async () => {
      const user = userEvent.setup();
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const noButton = screen.getByRole("button", { name: "No" });
      await user.click(noButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose with fireEvent when No button is clicked", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const noButton = screen.getByRole("button", { name: "No" });
      fireEvent.click(noButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Delete Functionality", () => {
    it("should make DELETE API call when Yes button is clicked", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://6852821e0594059b23cdd834.mockapi.io/Food/123",
          {
            method: "DELETE",
          }
        );
      });
    });

    it("should show success alert and reload page on successful delete", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("Item deleted successfully!");
        expect(window.location.reload).toHaveBeenCalled();
      });
    });

    it("should show error alert when delete fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith(
          "Something went wrong while deleting."
        );
      });
    });

    it("should show error alert when network error occurs", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith(
          "Something went wrong while deleting."
        );
      });
    });

    it("should not make API call if food.id is missing", async () => {
      const foodWithoutId: Food = {
        ...mockFood,
        id: "",
      };

      render(<DeleteForm onClose={mockOnClose} food={foodWithoutId} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    it("should log error to console when delete fails", async () => {
      const mockError = new Error("Delete failed");
      (global.fetch as jest.Mock).mockRejectedValue(mockError);

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
          "Error deleting item:",
          mockError
        );
      });
    });
  });

  describe("Button Styling", () => {
    it("should have correct gradient styling on Yes button", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      expect(yesButton).toHaveClass(
        "bg-[linear-gradient(97.86deg,#FFBA26_-8.95%,#FF9A0E_109.24%)]"
      );
    });

    it("should have correct border styling on No button", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const noButton = screen.getByRole("button", { name: "No" });
      expect(noButton).toHaveClass("border-[#FFBA26]");
    });
  });

  describe("Accessibility", () => {
    it("should have proper button roles", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("should have proper heading structure", () => {
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const heading = screen.getByRole("heading", { name: "Delete Meal" });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty food id", async () => {
      const emptyIdFood: Food = {
        ...mockFood,
        id: "",
      };

      render(<DeleteForm onClose={mockOnClose} food={emptyIdFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });
      fireEvent.click(yesButton);

      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    it("should handle multiple clicks on Yes button", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const yesButton = screen.getByRole("button", { name: "Yes" });

      fireEvent.click(yesButton);
      fireEvent.click(yesButton);

      await waitFor(() => {
        // Should be called twice since there's no loading state
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    it("should handle multiple clicks on No button", async () => {
      const user = userEvent.setup();
      render(<DeleteForm onClose={mockOnClose} food={mockFood} />);

      const noButton = screen.getByRole("button", { name: "No" });

      await user.click(noButton);
      await user.click(noButton);

      expect(mockOnClose).toHaveBeenCalledTimes(2);
    });
  });
});
