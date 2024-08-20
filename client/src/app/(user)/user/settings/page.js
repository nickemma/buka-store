"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Settings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cookie = getCookie("user");
  const myData = cookie ? JSON.parse(cookie) : "";
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const x = await client.fetch(`*[_type == "session_type" ]`);
      setData(data?.background);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const valueChange = (fieldName, value) => {
    setData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    console.log(formData);
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="">
          <h1 className="text-lg font-semibold md:text-2xl">
            Account Settings
          </h1>
        </div>
        <div className=" rounded-lg border border-dashed shadow-sm">
          <div className="">
            <div className="bg-white  px-4 py-3 rounded-md">
              <div className="grid  md:grid-cols-2 gap-3">
                <div>
                  <abel className="text-[0.8rem] font-semibold">
                    First Name
                  </abel>
                  <Input
                    value={data?.years_of_experience}
                    onChange={(e) => valueChange("first_name", e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <abel className="text-[0.8rem] font-semibold">Last Name</abel>
                  <Input
                    value={data?.professional_school}
                    onChange={(e) => valueChange("last_name", e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <abel className="text-[0.8rem] font-semibold">Email</abel>

                  <Input
                    value={data?.date_of_graduation}
                    onChange={(e) => valueChange("email", e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="mt-5 m-auto flex justify-center">
                <Button onClick={handleSubmit} className="w-full md:w-40">
                  {loading ? <PuffLoader size={20} /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
