"use client";

import Image from "next/image";
import TopNavBar from "./top_nav_bar";
import Header from "./header";
import FeaturedFoods from "@/components/FeaturedFoods";
import Footer from "@/components/Footer";
import { useState } from "react";
import AddMealForm from "@/components/AddMealForm";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Search query received:", query);
    setSearchQuery(query);
  };

  return (
    <div>
      <TopNavBar onOpen={() => setIsOpen(true)} />
      <div
        className={`transition-all duration-300 ${
          isOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <Header onSearch={handleSearch} />
        <FeaturedFoods searchQuery={searchQuery} />
        <Footer />
      </div>

      {/* Popup Form (only when open) */}
      {isOpen && <AddMealForm onClose={() => setIsOpen(false)} />}
    </div>
  );
}
