import { useState, useCallback } from "react";
import { createPropertyRequest } from "../_logic/functions/createPropertyRequest.js";

const useCreateProperty = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validatePropertyData = (propertyData) => {
    const errors = {};
    if (!propertyData.title?.trim()) {
      errors.title = "El título es obligatorio.";
    }
    if (!propertyData.image?.trim()) {
      errors.image = "La imagen es obligatoria.";
    }
    if (!propertyData.description?.trim()) {
      errors.description = "La descripción es obligatoria.";
    }
    if (!propertyData.location?.trim()) {
      errors.location = "La ubicación es obligatoria.";
    }
    if (!propertyData.rooms) {
      errors.rooms = "El número de habitaciones es obligatorio.";
    } else if (isNaN(propertyData.rooms) || parseInt(propertyData.rooms) <= 0) {
      errors.rooms =
        "El número de habitaciones debe ser un número mayor que 0.";
    }
    return errors;
  };

  const createProperty = useCallback(async (propertyData) => {
    const errors = validatePropertyData(propertyData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // No realizar la petición si hay errores de validación
    }

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const responseData = await createPropertyRequest(propertyData);
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    createProperty,
    validationErrors,
  };
};

export default useCreateProperty;
