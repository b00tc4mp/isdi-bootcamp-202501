import React from "react";

const WelcomePhrase = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 hover:text-blue-500 transition duration-300">
        ¡Bienvenido a Rental Rosario!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Explora las mejores propiedades disponibles en la ciudad.
      </p>
    </div>
  );
};

export default WelcomePhrase;
