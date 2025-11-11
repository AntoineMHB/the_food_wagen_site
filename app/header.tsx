import { Card } from "@/components/ui/card";
import OrderCard from "./searchCard";
import FeaturedFoods from "@/components/FeaturedFoods";
import { useState } from "react";
import SearchCard from "./searchCard";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-[#FFB30E] flex flex-col lg:flex-row items-start lg:items-center">
      {/* Left Section: Text + OrderCard */}
      <div className="w-full lg:w-2/3 px-6 sm:px-10 md:px-[80px] lg:pl-[120px] pt-[40px] sm:pt-[50px] md:pt-[60px] pb-[50px]">
        <p className="font-bold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[58px] leading-[100%] tracking-tight text-white">
          Are you starving?
        </p>

        <p className="text-[14px] sm:text-[15px] md:text-[16px] pt-4 pb-6 text-white leading-[120%]">
          Within a few clicks, find meals that are accessible near you
        </p>

        <div className="w-full">
          <SearchCard onSearch={onSearch} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 h-[300px] relative pt-[50%] sm:pt-[45%] md:pt-[40%] lg:pt-[35%] px-6 sm:px-10 md:px-5 lg:pr-20">
        <img
          src="/image_header.png"
          alt="header_image"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
