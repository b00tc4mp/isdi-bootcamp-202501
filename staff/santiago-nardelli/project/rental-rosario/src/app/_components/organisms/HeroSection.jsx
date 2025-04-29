"use client";

import React from "react";

import dynamic from "next/dynamic";
import ScrollPropertiesFind from "../atoms/ScrollToProperties";

// Carga dinámicamente el componente InteractiveRosarioMap solo en el cliente
const InteractiveRosarioMap = dynamic(
  () => import("../molecules/InteractiveRosarioMap"),
  {
    ssr: false,
  }
);

const HeroSection = () => {
  return (
    <div className="bg-[url('/images/rosario-hero.avif')] bg-cover bg-center text-white py-20 text-center h-screen flex items-center justify-center z-10">
      <div className="bg-black/30 p-8 flex md:flex-row flex-col items-center justify-around w-full max-w-5xl rounded-lg">
        {/* Columna para el texto */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Tu Próxima Aventura en Rosario Comienza Aquí
          </h1>
          {/* Posiblemente un input de búsqueda aquí */}
          <p className="mt-4 text-lg">
            Descubre los mejores alquileres y experiencias en la vibrante ciudad
            de Rosario.
          </p>
          {/* Botón "Ver Propiedades" */}
          <ScrollPropertiesFind className="mt-6 px-6 py-3 border border-white bg-transparent text-white cursor-pointer rounded-md transition-colors duration-300 hover:bg-white hover:text-black">
            Ver Propiedades
          </ScrollPropertiesFind>
        </div>

        {/* Columna para el mapa */}
        <div className="md:w-1/2 h-[300px] md:h-[400px] rounded-lg bg-gray-200">
          {/* 
          <p className="text-black text-center leading-[300px] md:leading-[400px]">
            Mapa de Rosario (Aquí)
          </p>
           */}
          <InteractiveRosarioMap />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
