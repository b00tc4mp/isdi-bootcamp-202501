import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Contenedor para el texto y los íconos */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Texto de pie de página */}
          <div className="mb-6 md:mb-0">
            <p className="text-center md:text-left text-lg font-semibold">
              © 2025 Alquileres Temporales Rosario. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
