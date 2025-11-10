import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { FaMotorcycle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export default function OrderCard() {
  return (
    <Card className="pt-2.5  w-[660px] h-40 rounded-[15px]">
      <div className="">
        <div className="pt-2 pl-5 flex flex-items space-x-5 pb-3">
          <div className="bg-[#F172281A] w-[138px] h-[30px] rounded-[10px] ">
            <div className="flex flex-items justify-center space-x-2.5 pt-0.5">
              <FaMotorcycle size={20} color="#F17228" className="pt-[5px]" />
              <p className="text-[#F17228] font-bold">Delivery</p>
            </div>
          </div>

          <div className="flex flex-items justify-center space-x-2.5 pt-0.5">
            <FaBagShopping size={20} color="#757575" />
            <p className="text-[#757575] font-bold">Pickup</p>
          </div>
        </div>
        <div className="w-[659px] h-0.5 bg-[#EEEEEE]"></div>
      </div>

      <div className="pl-5 flex flex-items space-x-5">
        <div className="w-[450px] h-[50px] bg-[#F5F5F5] rounded-[10px]">
          <div className="flex flex-items space-x-2 pl-2.5 pt-4">
            <IoSearch size={20} color="#F17228" />
            <p className="text-[#9E9E9E] text-[15px] leading-[100%]">
              What do you like to eat today?
            </p>
          </div>
        </div>

        <Button className="bg-[linear-gradient(95.71deg,#FF7A7A_-39.64%,#F75900_135.31%)] w-[150px] h-[50px]">
          <div className="flex flex-items justify-center space-x-2">
            <IoSearch size={20} />
            <p className="text-white text-[15px] leading-[100%]">Find Meal</p>
          </div>
        </Button>
      </div>
    </Card>
  );
}
