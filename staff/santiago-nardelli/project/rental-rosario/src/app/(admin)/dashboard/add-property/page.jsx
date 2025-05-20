// src/app/_components/pages/AddPage.jsx
"use client";
import React, { useEffect } from "react";
import { useCreateProperty } from "../../../hooks/useCreateProperty.js";
import GenericForm from "../../../_components/molecules/GenericForm.jsx";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const AddPage = () => {
  const { createProperty, propertyCreated, error, loading } =
    useCreateProperty();

  useEffect(() => {
    if (propertyCreated) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Propiedad creada correctamente.",
        confirmButtonText: "OK",
      });
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error,
        confirmButtonText: "OK",
      });
    }
  }, [propertyCreated, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.elements.title.value,
      image: e.target.elements.image.value,
      description: e.target.elements.description.value,
      location: e.target.elements.location.value,
      type: e.target.elements.type.value,
      bedrooms: Number(e.target.elements.bedrooms.value),
      travelers: Number(e.target.elements.travelers.value),
      airbnbUrl: e.target.elements.airbnbUrl.value,
    };
    await createProperty(formData);
    e.target.reset();
  };

  const formFields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Image URL", name: "image", type: "url", required: true },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    { label: "Location", name: "location", type: "text", required: true },
    {
      label: "Type",
      name: "type",
      type: "select",
      required: true,
      options: [
        { value: "apartment", label: "Apartamento" },
        { value: "house", label: "Casa" },
        { value: "studio", label: "Estudio" },
      ],
    },
    { label: "Rooms", name: "bedrooms", type: "number", required: true },
    { label: "Travelers", name: "travelers", type: "number", required: true },
    { label: "Airbnb URL", name: "airbnbUrl", type: "url", required: true },
  ];
  return (
    <div className="p-8">
      <GenericForm
        title="Property Details"
        fields={formFields}
        onSubmit={handleSubmit}
        submitButtonText="Create Property"
        className="max-w-md mx-auto"
        buttonClassName="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        error={null} // El manejo de errores se hace con SweetAlert
        loading={loading}
      />
    </div>
  );
};

export default AddPage;
