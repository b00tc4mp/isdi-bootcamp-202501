// src/app/dashboard/edit-property/page.jsx
"use client";

import React, { useEffect } from "react";
import { useAllProperties } from "../../../hooks/useAllProperties";
import "sweetalert2/dist/sweetalert2.min.css";
import { Button } from "../../../_components/ui/button";
import Swal from "sweetalert2";
import { useDeleteProperty } from "../../../hooks/useDeleteProperty";

const DeletePage = () => {
  const {
    data: properties,
    isLoading: fetchLoading,
    error: fetchError,
    fetchProperties,
  } = useAllProperties();

  const {
    isDeleting: deleteLoading,
    deleteError,
    deleteSuccess: propertyDeleted,
    clearStates,
    deleteProperty,
  } = useDeleteProperty();

  // useEffect para cargar las propiedades al montar el componente
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // useEffect para manejar la eliminación exitosa o con error
  useEffect(() => {
    if (propertyDeleted) {
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "La propiedad ha sido eliminada correctamente.",
        confirmButtonText: "OK",
      }).then(() => {
        clearStates(); // Limpiar estados después de mostrar la alerta
        fetchProperties(); // Vuelve a cargar la lista de propiedades después de eliminar
      });
    }
    if (deleteError) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: `Error al eliminar la propiedad: ${deleteError}`,
        confirmButtonText: "OK",
      });
    }
  }, [propertyDeleted, deleteError, fetchProperties]);

  // Manejador para el botón de eliminar
  const handleDeleteClick = async (propertyId, propertyTitle) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar "${propertyTitle}"?`,
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteProperty(propertyId);
    }
  };

  if (fetchLoading) {
    return <div className="text-center py-8">Cargando propiedades...</div>;
  }

  if (fetchError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar las propiedades: {fetchError}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <p className="text-center py-8">
        No hay propiedades disponibles para gestionar.
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestionar Propiedades</h1>

      <div
        id="properties"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {properties.map((property) => (
          <div key={property.id} className="border rounded-md p-4 shadow-sm">
            {/* Contenido de la tarjeta de la propiedad */}
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            {property.images && property.images.length > 0 && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-40 object-cover mt-2 rounded-md"
              />
            )}
            <div className="mt-4 flex justify-between space-x-2">
              <Button
                onClick={() => handleDeleteClick(property.id, property.title)}
                className="w-full bg-red-500 text-white hover:bg-red-600"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletePage;
