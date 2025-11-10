import Image from "next/image";
import TopNavBar from "./top_nav_bar";
import Header from "./header";
import FeaturedFoods from "@/components/FeaturedFoods";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <TopNavBar />
      <Header />
      <FeaturedFoods />
      <Footer />
    </div>
  );
}
