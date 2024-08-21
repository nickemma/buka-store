"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import React from "react";
const endpoint = "https://buka-store.vercel.app/api/cuisines";
function useCuisine() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      await axios
        .get(endpoint)
        .then((res) =>setData(res.data) )
        .catch((err) => {
          toast.error(
            <div>
              {err.response.data.errors
                ? err.response.data.errors.map((item) => item)
                : err.response.data.message}
            </div>,
            {
              action: {
                label: "Close",
                onClick: () => console.log("Undo"),
              },
            }
          );
        });
    };

    fetchCuisines();
  }, []);

  

  return {data}
}

export default useCuisine;
