import AllProduct from "@/components/AllProduct";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const BukaShop = () => {
  const [cookies] = useCookies(["buka"]);
  const endpoint = `https://buka-store.vercel.app/api/bukas/${cookies?.buka._id}`;

  const fetchShop = async () => {
    try {
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.buka.token}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      //setError("Failed to fetch orders");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  return (
    <div>
      <div className="w-full h-[400px] relative mb-3">
        <img
          src={cookies?.buka.image}
          alt={cookies?.buka.buka_name}
          className="w-full h-[400px] object-cover"
        />
      </div>
      <div className="w-full h-[200px] relative">
        <div className="absolute w-full flex justify-center m-auto left-0">
          <div className="w-full mx-3 md:w-[550px] shadow-md h-auto flex flex-col rounded-2xl bg-gray-100 py-2 px-3">
            <h2 className="text-[1.5rem] text-[#000] font-medium mb-4">
              Buka Information
            </h2>

            <div className="flex flex-col">
              {[
                { label: "Buka Name", value: cookies?.buka.buka_name },
                { label: "Address", value: cookies?.buka.address },
                { label: "PostCode", value: cookies?.buka.postcode },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-300 py-2 px-4"
                >
                  <div className="flex-1 flex gap-3">
                    <p className="text-[#000] font-medium">{item.label}:</p>
                    <p className="text-[#000]">{item.value}</p>
                  </div>
                  <button className="ml-4 text-blue-500 hover:text-blue-700">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Opening Hours */}
            {/* Go Live */}
          </div>
        </div>
      </div>
      {/* Cuisine Item */}
      <AllProduct />
    </div>
  );
};

export default BukaShop;
