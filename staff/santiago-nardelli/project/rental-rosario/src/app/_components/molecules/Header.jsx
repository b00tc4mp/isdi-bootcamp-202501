// src/app/_components/molecules/Header.jsx
"use client";

import React from "react";
import Logo from "../atoms/Logo.jsx";

const Header = ({ className }) => {
  const headerClasses = `absolute top-0 left-0 right-0 z-30 bg-transparent ${
    className || ""
  }`;
  return (
    <header className={headerClasses}>
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo y Títulos */}
        <div className="flex items-center space-x-4">
          <Logo />
          <div>
            <h1 className="text-xl font-semibold text-white">Rental Rosario</h1>{" "}
            {/* Texto blanco para contrastar con la imagen */}
            <p className="text-sm text-gray-300">
              Tu solución para alquileres en Rosario.
            </p>{" "}
            {/* Texto más claro */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
