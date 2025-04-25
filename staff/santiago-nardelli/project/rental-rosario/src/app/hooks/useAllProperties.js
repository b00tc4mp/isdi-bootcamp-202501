"use client";
import { useState, useEffect } from "react";
import { getAllPropertiesRequest } from "../_logic/functions/getAllPropertiesRequest.js";

const useAllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Inicializamos isLoading en true para mostrar un loader mientras se cargan los datos

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAllPropertiesRequest();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return {
    properties,
    error,
    isLoading,
  };
};

export default useAllProperties;
