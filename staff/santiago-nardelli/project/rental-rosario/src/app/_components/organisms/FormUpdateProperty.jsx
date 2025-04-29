// src/components/organisms/PropertyFormModify.js
import React, { useState, useEffect } from "react";
import { useUpdateProperty } from "../../hooks/useUpdateProperty";

const PropertyFormModify = ({ property, onClose, onPropertyUpdated }) => {
  const [formData, setFormData] = useState({});
  const {
    isUpdating,
    updateError,
    updateSuccess,
    updatedProperty,
    updateProperty,
  } = useUpdateProperty();

  useEffect(() => {
    // Inicializa el formulario con los datos de la propiedad
    if (property) {
      setFormData({ ...property });
    }
  }, [property]);

  useEffect(() => {
    if (updateSuccess && updatedProperty) {
      onClose(); // Cierra el modal al éxito
      if (onPropertyUpdated) {
        onPropertyUpdated(updatedProperty); // Notifica al padre
      }
    }
  }, [updateSuccess, updatedProperty, onClose, onPropertyUpdated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProperty(property.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {/* Campos del formulario pre-llenados con formData */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Título:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* ... otros campos del formulario ... */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUpdating ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
      {updateError && (
        <p className="text-red-500 text-xs italic mt-2">{updateError}</p>
      )}
    </form>
  );
};

export default PropertyFormModify;
