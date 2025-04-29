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

    try {
      // Llama a la función que realiza la solicitud de creación de propiedad
      const response = await createPropertyRequest(propertyData);
      if (response && response.success) {
        setPropertyCreated(true); // Actualiza el estado de creación de propiedad
        return true; // Indica que la creación fue exitosa
      } else {
        setError("Failed to create property"); // Establece un mensaje de error si la creación falla
        return false; // Indica que la creación falló
      }
    } catch (err) {
      setError(err.message); // Captura el mensaje de error
      return false; // Indica que hubo un error en la creación de la propiedad
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return { createProperty, propertyCreated, error, loading };
};
