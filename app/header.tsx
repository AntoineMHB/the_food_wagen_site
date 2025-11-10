import { Card } from "@/components/ui/card";
import OrderCard from "./order_card";

export default function Header() {
  return (
    <div className="w-full h-[428px] bg-[#FFB30E]">
      <div className="pl-[120px] pt-[60px] pb-[50px] w-[856px]">
        <p className="font-bold text-[58px] leading-[100%] tracking-[0] text-white">
          Are you starving?
        </p>
        <p className="text-[16px] pt-5 pb-5 text-white leading-[120%]">
          Within a few clicks, find meals that are accessible near you
        </p>
        <OrderCard />
      </div>
    </div>
  );
}
