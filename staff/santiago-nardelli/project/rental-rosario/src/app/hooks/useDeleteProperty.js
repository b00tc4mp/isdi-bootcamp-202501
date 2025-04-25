import { useState, useCallback } from "react";
import { deletePropertyRequest } from "../_logic/functions/deletePropertyRequest.js";

const useDeleteProperty = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const deleteProperty = useCallback(async (propertyId) => {
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
  }, []);

  return {
    isDeleting,
    deleteError,
    deleteSuccess,
    deleteProperty,
  };
};

export default useDeleteProperty;
