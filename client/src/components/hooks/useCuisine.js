"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import React from "react";
const endpoint = "https://buka-store.vercel.app/api/cuisines";
function useCuisine(id) {
  const [data, setData] = useState([]);
  const [details, setSetails] = useState(null);

  useEffect(() => {
    const fetchCuisines = async () => {
      await axios
        .get(endpoint)
        .then((res) => setData(res.data))
        .catch((err) => {});
    };

    fetchCuisines();
  }, []);

  console.log(data);

  useEffect(() => {
    const fetchCuisines = async () => {
      await axios
        .get(endpoint + "/" + id)
        .then((res) => setSetails(res.data))
        .catch((err) => {});
    };

    fetchCuisines();
  }, []);

  return { data, details };
}

export default useCuisine;
