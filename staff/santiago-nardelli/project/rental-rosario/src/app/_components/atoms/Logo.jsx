// src/app/_components/atoms/Logo.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
        <Image
          src="/images/logo-rental-1.1.png" // Ruta de la imagen
          alt="Logo"
          width={150} // Ajusta el ancho del logo
          height={150} // Ajusta la altura del logo
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
