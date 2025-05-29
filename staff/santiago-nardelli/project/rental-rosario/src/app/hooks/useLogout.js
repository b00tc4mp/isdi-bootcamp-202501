// hooks/useLogout.js
"use client"; // Este hook utilizará useRouter, que es un Client Hook

import { useRouter } from "next/navigation";
import { logoutUserRequest } from "../_logic/functions/logoutUserRequest";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    logoutUserRequest();
    router.push("/");
  };

  return logout;
};
