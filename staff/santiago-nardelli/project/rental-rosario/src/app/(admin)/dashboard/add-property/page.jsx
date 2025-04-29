"use client";
import React, { useState } from "react";
import useCreateProperty from "../../../hooks/useCreateProperty.js";
import formCreateProperty from "../../../_components/organisms/FormCreateProperty.jsx";
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

  const { createProperty, propertyCreated, error, loading } =
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
    <formCreateProperty
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      propertyCreated={propertyCreated}
    />
  );
};

export default PropertyForm;
