"use client"; // Este componente es un Client Component

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOnePropertie } from "../../../../hooks/useOnePropertie"; // Importa el hook para obtener una propiedad
import { useUpdateProperty } from "../../../../hooks/useUpdateProperty"; // Importa el hook para actualizar una propiedad
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const EditPropertySinglePage = () => {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.propertyId;

  // Utiliza el custom hook para obtener la propiedad
  const {
    data: property,
    isLoading,
    error,
    fetchPropertie,
  } = useOnePropertie(propertyId);

  // Utiliza el custom hook para actualizar la propiedad
  const {
    updateProperty,
    loading: updateLoading,
    error: updateError,
    propertyUpdated,
  } = useUpdateProperty();

  // Efecto para cargar la propiedad cuando el componente se monta o el propertyId cambia
  useEffect(() => {
    if (propertyId) {
      fetchPropertie();
    }
  }, [propertyId, fetchPropertie]);

  // Efecto para manejar la respuesta de la actualización
  useEffect(() => {
    if (propertyUpdated) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Propiedad actualizada correctamente.",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/dashboard/edit-product"); // Redirige a alguna página después de la actualización
      });
    }

    if (updateError) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: updateError,
        confirmButtonText: "OK",
      });
    }
  }, [propertyUpdated, updateError, router]);

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (propertyId) {
      const updates = {
        title: e.target.elements.title.value,
        images: [e.target.elements.images.value],
        description: e.target.elements.description.value,
        location: e.target.elements.location.value,
        type: e.target.elements.type.value,
        bedrooms: parseInt(e.target.elements.bedrooms.value),
        travelers: parseInt(e.target.elements.travelers.value),
        airbnbUrl: e.target.elements.airbnbUrl.value,
      };

      // Llama a la función de actualización del custom hook
      await updateProperty(propertyId, updates);
    }
  };

  // Muestra un estado de carga mientras se obtiene la propiedad
  if (isLoading) {
    return <div className="text-center py-8">Cargando propiedad...</div>;
  }

  // Muestra un mensaje de error si falla la carga inicial
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar la propiedad: {error}
      </div>
    );
  }

  // Si la propiedad no se encuentra después de la carga, muestra un mensaje
  if (!property) {
    return <div className="text-center py-8">Propiedad no encontrada.</div>;
  }

  // Si la propiedad se ha cargado, muestra el formulario
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Propiedad</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label
            htmlFor="propertyId"
            className="block text-sm font-medium text-gray-700"
          >
            ID de la Propiedad
          </label>
          <input
            type="text"
            id="propertyId"
            name="propertyId"
            value={property.id}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm cursor-not-allowed bg-gray-100 p-2"
            readOnly
          />
        </div> */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={property.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            URL de la Imagen
          </label>
          <input
            type="url"
            id="images"
            name="image"
            defaultValue={property.image}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            defaultValue={property.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={property.location}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo
          </label>
          <select
            id="type"
            name="type"
            defaultValue={property.type}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          >
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="studio">Estudio</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Habitaciones
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            defaultValue={property.bedrooms}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Viajeros
          </label>
          <input
            type="number"
            id="travelers"
            name="travelers"
            defaultValue={property.travelers}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="airbnbUrl"
            className="block text-sm font-medium text-gray-700"
          >
            URL de Airbnb
          </label>
          <input
            type="url"
            id="airbnbUrl"
            name="airbnbUrl"
            defaultValue={property.airbnbUrl}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              updateLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
            disabled={updateLoading}
          >
            {updateLoading ? "Actualizando..." : "Actualizar Propiedad"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertySinglePage;
