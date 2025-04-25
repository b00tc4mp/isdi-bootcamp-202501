// src/app/_components/atoms/Logo.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const handleNavigation = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
      <img src="/path-to-logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;
