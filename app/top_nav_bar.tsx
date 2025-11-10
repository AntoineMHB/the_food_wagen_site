import { Button } from "@/components/ui/button";

export default function TopNavBar() {
  return (
    <div className="flex flex-items justify-between h-16 w-auto bg-white pl-[120px] pr-[120px] pt-4 pb-4">
      <div className="w-[150px] h-1">
        <img src="/Logo.png" alt="Logo" />
      </div>

      <div>
        <Button className="text-white rounded-[10px] h-8 w-[150px] bg-[#FF9A0E] shadow-amber-500">
          Add Meal
        </Button>
      </div>
    </div>
  );
}
