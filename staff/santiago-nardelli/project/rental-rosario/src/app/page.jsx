import React from "react";
import { getAllPropertiesRequest } from "./_logic/functions/getAllPropertiesRequest.js";

export const dynamic = "force-dynamic"; // Forzamos SSR dinámico

export default async function Home() {
  let properties = [];

  try {
    // Intentamos obtener las propiedades desde la función
    properties = await getAllPropertiesRequest();
    console.log("Propiedades obtenidas en SSR:", properties.length);
  } catch (error) {
    console.error("Error al obtener propiedades en SSR:", error);
    return (
      <div className="p-4">
        <p className="text-red-500">
          Error al cargar las propiedades. Por favor, intenta nuevamente más
          tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Propiedades</h1>
      {properties.length === 0 ? (
        <p>No hay propiedades disponibles.</p>
      ) : (
        <ul className="list-disc pl-5">
          {properties.map((property, index) => (
            <li key={index}>
              <p>{property.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
