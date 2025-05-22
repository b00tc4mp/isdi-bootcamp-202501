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
        relative h-screen flex items-center justify-center z-10
        text-white py-20 text-center
        overflow-hidden /* Importante para asegurar que la imagen no genere scroll */
      "
    >
      {/* 1. Imagen de fondo (como etiqueta <img>) */}
      <img
        src="/images/rosario1.2.jpg"
        alt="Monumento a la Bandera de Rosario"
        className="
          absolute inset-0 w-full h-full
          object-cover /* Escala la imagen para cubrir el contenedor sin distorsión, recortando si es necesario */
          object-center /* Centra la imagen dentro del contenedor */
          z-0 /* Asegura que la imagen esté en el fondo */
        "
      />

      {/* 2. Capa de superposición grisácea (overlay) */}
      {/* Esta capa aparecerá en móvil y desaparecerá en md y superiores, oscureciendo solo la imagen de fondo */}
      <div className="absolute inset-0 bg-black/30  z-0"></div>

      {/* 3. Contenido principal (el recuadro con el texto y el mapa) */}
      <div
        className="
          p-8 flex md:flex-row flex-col items-center justify-around
          w-full max-w-5xl rounded-lg
          bg-transparent md:bg-black/30 /* Fondo del recuadro: transparente en móvil, grisáceo en desktop */
          relative z-20 mt-20 /* Asegura que este div esté por encima del overlay y la imagen */
        "
      >
        {/* Columna para el texto */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1
            className={`text-3xl md:text-5xl font-bold mb-4 ${playfair.className}`}
          >
            Tu Próxima Aventura en Rosario Comienza Aquí
          </h1>
          <p className="mt-4 text-lg">
            Descubre los mejores alquileres y experiencias en la vibrante ciudad
            de Rosario.
          </p>
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
              Ver Opciones
            </ScrollToProperties>
          </motion.div>
        </div>

        {/* Columna para el mapa */}
        <div className="md:w-1/2 h-[300px] md:h-[400px] rounded-lg bg-gray-200">
          <InteractiveRosarioMap />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
