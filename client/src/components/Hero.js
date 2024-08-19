import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, UserIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full h-[400px] relative">
      <img src="/food-buka.png" className="w-full h-[400px] object-cover " />

<div className="absolute w-full flex text-center justify-center m-auto -bottom-10 left-0">
<div className="w-full mx-3 md:w-[400px] shadow-md h-[200px] flex flex-col items-center justify-center  rounded-md bg-white">
        <h2 className="text-[1.1rem]">Homemade meals made with ingenuity and love</h2>

        <span  className="text-[0.6rem] py-3">Find a meal close to you</span>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[300px] border-green-500"
          />
        </div>
      </div>
</div>
   
    </div>
  );
};

export default Hero;
