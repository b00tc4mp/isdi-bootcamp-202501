// src/hooks/useUpdateProperty.js
import { useState, useCallback } from "react";
import { updatePropertyRequest } from "../_logic/functions/updatePropertyRequest.js";

const useUpdateProperty = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState(null);

  const updateProperty = useCallback(async (propertyId, propertyData) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    setUpdatedProperty(null);

    try {
      const data = await updatePropertyRequest(propertyId, propertyData);
      setUpdatedProperty(data);
      setUpdateSuccess(true);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    isUpdating,
    updateError,
    updateSuccess,
    updatedProperty,
    updateProperty,
  };
};

export default useUpdateProperty;
