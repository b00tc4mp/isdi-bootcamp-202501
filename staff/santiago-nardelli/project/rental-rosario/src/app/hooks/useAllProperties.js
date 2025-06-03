import { useState, useEffect, useCallback } from "react";
import { getAllPropertiesRequest } from "../_logic/functions/getAllPropertiesRequest.js";

export const useAllProperties = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await getAllPropertiesRequest();
      setData(responseData);
    } catch (err) {
      setError(err.message || "Error al cargar las propiedades.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { data, isLoading, error, fetchProperties };
};
