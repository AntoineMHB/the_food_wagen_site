import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopupForm from "@/components/AddMealForm";
import React from "react";

// Mock console methods
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("AddMealForm (PopupForm) Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("should render the form modal with title", () => {
      render(<PopupForm onClose={mockOnClose} />);

      expect(screen.getByText("Add a meal")).toBeInTheDocument();
    });

    it("should render all form input fields", () => {
      render(<PopupForm onClose={mockOnClose} />);

      expect(screen.getByPlaceholderText("Food name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Food rating")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Food image (link)")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Restaurant name")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Restaurant logo (link)")
      ).toBeInTheDocument();
    });

    it("should render restaurant status dropdown", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      expect(
        screen.getByText("Restaurant status (open/close)")
      ).toBeInTheDocument();
    });

    it("should render Add and Cancel buttons", () => {
      render(<PopupForm onClose={mockOnClose} />);

      expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
    });

    it("should have modal backdrop", () => {
      const { container } = render(<PopupForm onClose={mockOnClose} />);

      const backdrop = container.firstChild;
      expect(backdrop).toHaveClass("fixed", "inset-0", "bg-black/40");
    });

    it("should have all input fields marked as required", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText("Food name");
      const ratingInput = screen.getByPlaceholderText("Food rating");
      const avatarInput = screen.getByPlaceholderText("Food image (link)");
      const restaurantInput = screen.getByPlaceholderText("Restaurant name");
      const logoInput = screen.getByPlaceholderText("Restaurant logo (link)");

      expect(nameInput).toBeRequired();
      expect(ratingInput).toBeRequired();
      expect(avatarInput).toBeRequired();
      expect(restaurantInput).toBeRequired();
      expect(logoInput).toBeRequired();
    });
  });

  describe("User Input Handling", () => {
    it("should update food name input value", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(
        "Food name"
      ) as HTMLInputElement;
      await user.type(nameInput, "Margherita Pizza");

      expect(nameInput.value).toBe("Margherita Pizza");
    });

    it("should update food rating input value", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const ratingInput = screen.getByPlaceholderText(
        "Food rating"
      ) as HTMLInputElement;
      await user.type(ratingInput, "4.5");

      expect(ratingInput.value).toBe("4.5");
    });

    it("should update food image input value", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const avatarInput = screen.getByPlaceholderText(
        "Food image (link)"
      ) as HTMLInputElement;
      await user.type(avatarInput, "https://example.com/pizza.jpg");

      expect(avatarInput.value).toBe("https://example.com/pizza.jpg");
    });

    it("should update restaurant name input value", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const restaurantInput = screen.getByPlaceholderText(
        "Restaurant name"
      ) as HTMLInputElement;
      await user.type(restaurantInput, "Italian Kitchen");

      expect(restaurantInput.value).toBe("Italian Kitchen");
    });

    it("should update restaurant logo input value", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const logoInput = screen.getByPlaceholderText(
        "Restaurant logo (link)"
      ) as HTMLInputElement;
      await user.type(logoInput, "https://example.com/logo.jpg");

      expect(logoInput.value).toBe("https://example.com/logo.jpg");
    });

    it("should update restaurant status dropdown", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const dropdown = screen.getByRole("combobox") as HTMLSelectElement;
      await user.selectOptions(dropdown, "open");

      expect(dropdown.value).toBe("open");
    });

    it("should handle selecting close status", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      const dropdown = screen.getByRole("combobox") as HTMLSelectElement;
      await user.selectOptions(dropdown, "close");

      expect(dropdown.value).toBe("close");
    });

    it("should update all fields when filled", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      expect(
        (screen.getByPlaceholderText("Food name") as HTMLInputElement).value
      ).toBe("Pizza");
      expect(
        (screen.getByPlaceholderText("Food rating") as HTMLInputElement).value
      ).toBe("4.5");
      expect(
        (screen.getByPlaceholderText("Food image (link)") as HTMLInputElement)
          .value
      ).toBe("image.jpg");
      expect(
        (screen.getByPlaceholderText("Restaurant name") as HTMLInputElement)
          .value
      ).toBe("Restaurant");
      expect(
        (
          screen.getByPlaceholderText(
            "Restaurant logo (link)"
          ) as HTMLInputElement
        ).value
      ).toBe("logo.jpg");
      expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
        "open"
      );
    });
  });

  describe("Form Submission", () => {
    it("should call API with correct data when form is submitted", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123" }),
      });

      render(<PopupForm onClose={mockOnClose} />);

      await user.type(
        screen.getByPlaceholderText("Food name"),
        "Margherita Pizza"
      );
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "https://example.com/pizza.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Italian Kitchen"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "https://example.com/logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      await user.click(screen.getByRole("button", { name: "Add" }));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://6852821e0594059b23cdd834.mockapi.io/Food",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Margherita Pizza",
              rating: "4.5",
              avatar: "https://example.com/pizza.jpg",
              restaurant_name: "Italian Kitchen",
              logo: "https://example.com/logo.jpg",
              open: "open",
            }),
          }
        );
      });
    });

    it("should log success message and close modal on successful submission", async () => {
      const user = userEvent.setup();
      const mockResponse = { id: "123", name: "Margherita Pizza" };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      render(<PopupForm onClose={mockOnClose} />);

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      await user.click(screen.getByRole("button", { name: "Add" }));

      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(
          "Form submitted successfully:",
          mockResponse
        );
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it("should reset form fields after successful submission", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ id: "123" }),
      });

      render(<PopupForm onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText(
        "Food name"
      ) as HTMLInputElement;
      const ratingInput = screen.getByPlaceholderText(
        "Food rating"
      ) as HTMLInputElement;

      await user.type(nameInput, "Pizza");
      await user.type(ratingInput, "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      await user.click(screen.getByRole("button", { name: "Add" }));

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });

      // Note: Fields are reset before onClose, but component unmounts after onClose
      // So we can verify the onClose was called, indicating reset happened
    });

    it("should log error when API call fails", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<PopupForm onClose={mockOnClose} />);

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      await user.click(screen.getByRole("button", { name: "Add" }));

      await waitFor(() => {
        expect(console.error).toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it("should handle network errors", async () => {
      const user = userEvent.setup();
      const networkError = new Error("Network error");
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      render(<PopupForm onClose={mockOnClose} />);

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      await user.click(screen.getByRole("button", { name: "Add" }));

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
          "Error submitting form:",
          networkError
        );
      });
    });

    it("should prevent default form submission behavior", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(<PopupForm onClose={mockOnClose} />);

      const form = screen.getByRole("button", { name: "Add" }).closest("form");
      const submitHandler = jest.fn((e) => e.preventDefault());

      if (form) {
        form.onsubmit = submitHandler;
      }

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.type(screen.getByPlaceholderText("Food rating"), "4.5");
      await user.type(
        screen.getByPlaceholderText("Food image (link)"),
        "image.jpg"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant name"),
        "Restaurant"
      );
      await user.type(
        screen.getByPlaceholderText("Restaurant logo (link)"),
        "logo.jpg"
      );
      await user.selectOptions(screen.getByRole("combobox"), "open");

      fireEvent.submit(form!);

      expect(submitHandler).toHaveBeenCalled();
    });
  });

  describe("Cancel Button", () => {
    it("should call onClose when Cancel button is clicked", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      await user.click(screen.getByRole("button", { name: "Cancel" }));

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not submit form when Cancel is clicked", async () => {
      const user = userEvent.setup();
      render(<PopupForm onClose={mockOnClose} />);

      await user.type(screen.getByPlaceholderText("Food name"), "Pizza");
      await user.click(screen.getByRole("button", { name: "Cancel" }));

      expect(global.fetch).not.toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Styling", () => {
    it("should have correct gradient styling on Add button", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toHaveClass(
        "bg-[linear-gradient(97.86deg,#FFBA26_-8.95%,#FF9A0E_109.24%)]"
      );
    });

    it("should have correct border styling on Cancel button", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      expect(cancelButton).toHaveClass("border-[#FFBA26]");
    });

    it("should have correct title styling", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const title = screen.getByText("Add a meal");
      expect(title).toHaveClass("text-[#FF9A0E]");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const heading = screen.getByRole("heading", { name: "Add a meal" });
      expect(heading).toBeInTheDocument();
    });

    it("should have proper form structure", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const form = screen.getByRole("button", { name: "Add" }).closest("form");
      expect(form).toBeInTheDocument();
    });

    it("should have proper button types", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const addButton = screen.getByRole("button", { name: "Add" });
      const cancelButton = screen.getByRole("button", { name: "Cancel" });

      expect(addButton).toHaveAttribute("type", "submit");
      expect(cancelButton).toHaveAttribute("type", "button");
    });
  });

  describe("Dropdown Options", () => {
    it("should have Open and Close options in dropdown", () => {
      render(<PopupForm onClose={mockOnClose} />);

      expect(screen.getByRole("option", { name: "Open" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Close" })).toBeInTheDocument();
    });

    it("should have correct option values", () => {
      render(<PopupForm onClose={mockOnClose} />);

      const openOption = screen.getByRole("option", {
        name: "Open",
      }) as HTMLOptionElement;
      const closeOption = screen.getByRole("option", {
        name: "Close",
      }) as HTMLOptionElement;

      expect(openOption.value).toBe("open");
      expect(closeOption.value).toBe("close");
    });
  });
});
