"use client";

import React, { useEffect } from "react";
import { useAllProperties } from "../../../hooks/useAllProperties";
import "sweetalert2/dist/sweetalert2.min.css";
import { Button } from "../../../_components/ui/button";
import Link from "next/link";

const EditPropertyPage = () => {
  const {
    data: properties,
    isLoading: fetchLoading,
    error: fetchError,
    fetchProperties,
  } = useAllProperties();

  // useEffect para cargar las propiedades al montar el componente
  useEffect(() => {
    fetchProperties();
  }, []);

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
        No hay propiedades disponibles para editar.
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Modify Properties</h1>

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
            {/* **El componente Link ahora envuelve solo el botón** */}
            <Link href={`/dashboard/edit-product/${property.id}`}>
              <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
                Modificar
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPropertyPage;
