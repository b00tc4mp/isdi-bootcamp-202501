// src/hooks/useUpdateProperty.js
import { useState } from "react";
import { updatePropertyRequest } from "../_logic/functions/updatePropertyRequest";

export const useUpdateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [propertyUpdated, setPropertyUpdated] = useState(false);

  const updateProperty = async (propertyId, updates) => {
    try {
      setLoading(true); // Indicamos que la operación de actualización ha comenzado
      setError(null); // Limpiamos cualquier error previo
      setPropertyUpdated(false); // Reiniciamos el estado de éxito

      await updatePropertyRequest(propertyId, updates); // Llamamos a tu lógica de fetch

      setPropertyUpdated(true); // Si la llamada es exitosa, indicamos que la propiedad se actualizó
    } catch (err) {
      setError(err.message); // Si hay un error, lo almacenamos en el estado 'error'
    } finally {
      setLoading(false); // Indicamos que la operación de actualización ha terminado (ya sea con éxito o error)
    }
  };

  return {
    updateProperty,
    loading,
    error,
    propertyUpdated,
  };
};

export default useUpdateProperty;
