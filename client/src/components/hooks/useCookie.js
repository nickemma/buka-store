"use client";

import React from "react";
import { getCookie } from "cookies-next";

function useCookie() {
  const cookie = getCookie("user");
  const cookiesData = cookie ? JSON.parse(cookie) : "";

  return { cookiesData };
}

export default useCookie;
