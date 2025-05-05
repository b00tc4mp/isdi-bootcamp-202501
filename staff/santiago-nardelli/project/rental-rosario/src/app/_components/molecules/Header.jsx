// src/app/_components/molecules/Header.jsx
"use client";

import React from "react";
import Logo from "../atoms/Logo.jsx";
import useAuthRedirect from "../../hooks/useAuthRedirect.js";

const Header = ({ className }) => {
  const handleLogoClick = useAuthRedirect(); // Usa el custom hook para obtener la función de redirección

  const headerClasses = `absolute top-0 left-0 right-0 z-30 bg-transparent ${
    className || ""
  }`;
  return (
    <header className={headerClasses}>
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo y Títulos */}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Logo />
          <div>
            <h1 className="text-xl font-semibold text-white">Rental Rosario</h1>
            <p className="text-sm text-gray-300">
              Tu solución para alquileres en Rosario.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
