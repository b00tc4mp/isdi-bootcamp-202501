"use client";
import { createPropertyRequest } from "../_logic/functions/createPropertyRequest";
import { useState } from "react";

export const useCreateProperty = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [propertyCreated, setPropertyCreated] = useState(false); // Estado para verificar si la propiedad fue creada

  const createProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    setPropertyCreated(false); // Reinicia el estado de creación de propiedad

    try {
      // Llama a la función que realiza la solicitud de creación de propiedad
      const response = await createPropertyRequest(propertyData);
      if (response && response.success) {
        setPropertyCreated(true); // Actualiza el estado de creación de propiedad
        return true; // Indica que la creación fue exitosa
      } else {
        setError("Error al crear la propiedad"); // Maneja el error de creación
        return false; // Indica que hubo un error
      }
    } catch (error) {
      setError(error.message); // Maneja el error de la solicitud
      return false; // Indica que hubo un error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return { createProperty, propertyCreated, error, loading };
};
