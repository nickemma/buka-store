import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            Orders Page
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
