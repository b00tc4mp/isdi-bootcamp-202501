// src/components/atoms/DeleteButton.js
import React from "react";
import { useDeleteProperty } from "../../hooks/useDeleteProperty"; // Asegúrate de la ruta correcta

const DeleteButton = ({ propertyId, onDeleteSuccess, className = "" }) => {
  const { isDeleting, deleteError, deleteSuccess, deleteProperty } =
    useDeleteProperty();

  const handleDelete = async () => {
    await deleteProperty(propertyId);
    if (deleteSuccess && onDeleteSuccess) {
      onDeleteSuccess(propertyId);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </button>
      {deleteError && (
        <p className="text-red-500 text-xs italic mt-2">{deleteError}</p>
      )}
      {deleteSuccess && (
        <p className="text-green-500 text-xs italic mt-2">
          Propiedad eliminada.
        </p>
      )}
    </div>
  );
};

export default DeleteButton;
