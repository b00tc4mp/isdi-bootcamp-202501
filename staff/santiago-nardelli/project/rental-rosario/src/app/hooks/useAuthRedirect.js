// src/app/_hooks/useAuthRedirect.js
"use client";

import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "../_logic/functions/isUserLoggedIn.js";

const useAuthRedirect = () => {
  const router = useRouter();

  const handleAuthRedirect = () => {
    if (isUserLoggedIn()) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return handleAuthRedirect;
};

export default useAuthRedirect;
