"use client";
import React, { useState } from "react";
import useCreateProperty from "../../../hooks/useCreateProperty.js";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    location: "",
    type: "",
    rooms: "",
    bathrooms: "",
    garage: "",
    pool: "",
    pets: "",
  });

  const { data, error, isLoading, createProperty, validationErrors } =
    useCreateProperty();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      price: Number(formData.price),
      rooms: Number(formData.rooms),
      bathrooms: Number(formData.bathrooms),
      garage: Number(formData.garage),
    };
    await createProperty(formDataToSend);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">
        Crear Nueva Propiedad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Título <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.title ? "border-red-500" : ""
            }`}
          />
          {validationErrors.title && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Imagen (URL) <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.image ? "border-red-500" : ""
            }`}
          />
          {validationErrors.image && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.image}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Descripción <span className="text-red-500">*</span>:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.description ? "border-red-500" : ""
            }`}
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.description}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Ubicación <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.location ? "border-red-500" : ""
            }`}
          />
          {validationErrors.location && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.location}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Tipo:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
          />
        </div>

        <div>
          <label
            htmlFor="rooms"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Habitaciones <span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.rooms ? "border-red-500" : ""
            }`}
          />
          {validationErrors.rooms && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.rooms}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Arbnb (URL) <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.urlArbnb}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 ${
              validationErrors.urlArbnb ? "border-red-500" : ""
            }`}
          />
          {validationErrors.title && (
            <p className="text-red-500 text-xs italic mt-1">
              {validationErrors.urlArbnb}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                title: "",
                image: "",
                description: "",
                location: "",
                type: "",
                rooms: "",
                urlArbnb: "",
              })
            }
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isLoading || Object.keys(validationErrors).length > 0}
            className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading || Object.keys(validationErrors).length > 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Creando..." : "Crear Propiedad"}
          </button>
        </div>

        {data && (
          <p className="text-green-400 text-sm italic mt-4">
            Propiedad creada con ID: {data?.id || "Éxito"}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm italic mt-4">Error: {error}</p>
        )}
      </form>
    </div>
  );
};

export default PropertyForm;
