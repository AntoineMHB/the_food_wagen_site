import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OpenFormButtonProps {
  onOpen: () => void;
}

export default function TopNavBar({ onOpen }: OpenFormButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between w-full bg-white py-4 px-6 sm:px-10 md:px-20 lg:px-[120px]">
      {/* Logo */}
      <div className="w-[100px] sm:w-[130px] md:w-[150px]">
        <img
          src="/Logo.png"
          alt="Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Button */}
      <div>
        <Button
          className="text-white text-sm sm:text-base rounded-xl sm:rounded-[10px] h-8 sm:h-9 md:h-10 w-[110px] sm:w-[130px] md:w-[150px] bg-[#FF9A0E] shadow-md hover:bg-[#ff8800] transition"
          onClick={onOpen}
        >
          Add Meal
        </Button>
      </div>
    </div>
  );
}
