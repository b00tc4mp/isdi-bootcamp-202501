import React from "react";

const Card = ({ title, description, location, rooms, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-2">
          {description?.substring(0, 100)}...
        </p>
        <div className="flex items-center text-gray-600 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          {location}
        </div>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m12-2H7m12-6v-2c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1v2m12-6H7"
            ></path>
          </svg>
          {rooms} Habitaciones
        </div>
        <a
          href="https://www.airbnb.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver más en Airbnb
        </a>
      </div>
    </div>
  );
};
/**
 * Consideraciones:

Enlace Dinámico: Si en el futuro deseas que el botón "Ver más" redirija a una página específica de cada propiedad dentro de tu propia aplicación o a un enlace externo diferente para cada propiedad, necesitarás agregar una prop adicional al componente Card (por ejemplo, linkUrl) y pasar la URL correspondiente desde el map en LandingPage. Luego, usarías esa prop en el atributo href del <a> tag.
 */

export default Card;
