import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pin, PinIcon, PlusCircle, SearchIcon, UserIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
function Kitchen() {
  const items = [
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      quantity: 3,
    },
  ];
  return (
    <div className="px-3">
      <div className="w-full h-[400px] relative">
        <img src="/food-buka.png" className="w-full h-[400px] object-cover " />

        <div className="absolute w-full flex text-center justify-center m-auto -bottom-10 left-0">
          <div className="w-full mx-3 md:w-[400px] shadow-md h-[200px] flex flex-col items-center justify-center  rounded-md bg-white">
            <h2 className="text-[1.1rem]">Aduke's Kitchen</h2>

            <span className="text-[0.6rem] py-3">African, Nigeria</span>
            <span className="text-[0.8rem] py-3 flex items-center">
              <PinIcon />
              England W3, London Uk African, Nigeria
            </span>

            <div className="flex gap-5">
              <div>
                <h2 className=" underline text-[0.7rem] ">Opening Time</h2>
                <span className=" text-sm  font-semibold">8am - 10pm</span>
              </div>
              <div>
                <h2 className=" underline text-[0.7rem] ">Delivery Time</h2>
                <span className=" text-sm  font-semibold">8am - 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 my-14 gap-3">
        <div className="border rounded-md  p-3">
          <h1 className="text-xl font-bold">Your Cart</h1>

          <div className="flex flex-col gap-2 mt-3">
            {items.map((item) => (
              <div className="text-sm ">
                {item?.name}
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-md p-3">
          <h1 className="text-xl font-bold">Your Cart</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/food-buka.png"
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="text-[0.7rem] font-bold">{item.name}</h3>
                    <p className="text-muted-foreground text-[0.7rem]">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="">
                      <PlusCircle size={"20"} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {item?.name}
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-md">hello</div>
      </div>
    </div>
  );
}

export default Kitchen;
