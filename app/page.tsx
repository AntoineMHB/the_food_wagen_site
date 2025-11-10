import Image from "next/image";
import TopNavBar from "./top_nav_bar";
import Header from "./header";
import FeaturedFoods from "@/components/FeaturedFoods";

export default function Home() {
  return (
    <div>
      <TopNavBar />
      <Header />
      <FeaturedFoods />
    </div>
  );
}
