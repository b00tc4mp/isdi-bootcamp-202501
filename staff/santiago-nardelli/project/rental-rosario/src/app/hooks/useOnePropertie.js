import { useState, useCallback } from "react";
import { getOnePropertieRequest } from "../_logic/functions/getOnePropertieRequest.js";

export const useOnePropertie = (propertyId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertie = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await getOnePropertieRequest(propertyId);
      setData(responseData);
    } catch (err) {
      setError(err.message || "Error al cargar la propiedad.");
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]); // ¡'propertyId' como dependencia de useCallback!

  return { data, isLoading, error, fetchPropertie };
};
