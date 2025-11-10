import Image from "next/image";
import TopNavBar from "./top_nav_bar";
import Header from "./header";

export default function Home() {
  return (
    <div>
      <TopNavBar />
      <div className="flex flex-items">
        <Header />

        {/* <div className="h-[500px] w-[600px] bg-[#FFB30E]">
          <img src="/image_header.png" alt="header_image" />
        </div> */}
      </div>
    </div>
  );
}
