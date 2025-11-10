import { Card } from "@/components/ui/card";
import OrderCard from "./order_card";

export default function Header() {
  return (
    <div className="w-full min-h-[428px] bg-[#FFB30E]">
      <div className="pl-6 sm:pl-10 md:pl-[80px] lg:pl-[120px] pt-[60px] pb-[50px] w-full max-w-[856px]">
        <p className="font-bold text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[100%] tracking-tight text-white">
          Are you starving?
        </p>

        <p className="text-[14px] sm:text-[15px] md:text-[16px] pt-4 pb-6 text-white leading-[120%]">
          Within a few clicks, find meals that are accessible near you
        </p>

        <OrderCard />
      </div>
    </div>
  );
}
