"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ScrollToProperties from "../atoms/ScrollToProperties";
import { Playfair_Display } from "next/font/google";

// Carga dinámicamente el componente InteractiveRosarioMap solo en el cliente
const InteractiveRosarioMap = dynamic(
  () => import("../molecules/InteractiveRosarioMap"),
  {
    ssr: false,
  }
);
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const HeroSection = () => {
  return (
    <div
      className="
    bg-[url('/images/rosario-hero.avif')] bg-cover bg-center
    text-white py-20 text-center h-screen flex items-center justify-center z-10
    relative
    before:absolute before:inset-0 before:bg-black/30 before:block md:before:hidden
  "
    >
      <div
        className="
      p-8 flex md:flex-row flex-col items-center justify-around
      w-full max-w-5xl rounded-lg
      bg-transparent md:bg-black/30
      relative z-20 mt-20
    "
      >
        {/* Columna para el texto */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1
            className={`text-3xl md:text-5xl font-bold mb-4 ${playfair.className}`}
          >
            Tu Próxima Aventura en Rosario Comienza Aquí
          </h1>
          {/* Posiblemente un input de búsqueda aquí */}
          <p className="mt-4 text-lg">
            Descubre los mejores alquileres y experiencias en la vibrante ciudad
            de Rosario.
          </p>
          {/* Botón "Ver Propiedades" */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ScrollToProperties className="mt-6 px-6 py-3 border border-white bg-transparent text-white cursor-pointer rounded-md transition-colors duration-300 hover:bg-white hover:text-black">
              Ver Propiedades
            </ScrollToProperties>
          </motion.div>
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
