// src/app/_components/atoms/Logo.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon, ClockIcon } from "lucide-react";

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <HomeIcon size={48} color="#007bff" />
        <ClockIcon size={32} color="#6c757d" style={{ marginLeft: "-10px" }} />
        <span
          style={{ marginLeft: "8px", fontWeight: "bold", fontSize: "1.5em" }}
        >
          TempStay
        </span>
      </div>
    </div>
  );
};

export default Logo;
