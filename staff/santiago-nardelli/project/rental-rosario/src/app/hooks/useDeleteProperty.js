import { useState } from "react";
import { deletePropertyRequest } from "../_logic/functions/deletePropertyRequest.js";

export const useDeleteProperty = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const deleteProperty = async (propertyId) => {
    setIsDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(false);

    try {
      await deletePropertyRequest(propertyId);
      setDeleteSuccess(true);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para limpiar estados
  const clearStates = () => {
    setDeleteError(null);
    setDeleteSuccess(false);
  };

  return {
    isDeleting,
    deleteError,
    deleteSuccess,
    clearStates,
    deleteProperty,
  };
};
