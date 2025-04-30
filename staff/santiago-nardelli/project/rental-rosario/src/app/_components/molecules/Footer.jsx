import React from "react";
import { MotionDiv } from "../atoms/MotionWrapper.jsx"; // Asumiendo que tienes el wrapper de Motion
import { Facebook, Twitter, Instagram, GitHub } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Contenedor para el texto y los íconos */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Texto de pie de página */}
          <div className="mb-6 md:mb-0">
            <p className="text-center md:text-left text-lg font-semibold">
              © 2025 TempStay. Todos los derechos reservados.
            </p>
          </div>

          {/* Íconos sociales */}
          <div className="flex space-x-6">
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-500"
              >
                <Facebook />
              </a>
            </MotionDiv>
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400"
              >
                <Twitter />
              </a>
            </MotionDiv>
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500"
              >
                <Instagram />
              </a>
            </MotionDiv>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
