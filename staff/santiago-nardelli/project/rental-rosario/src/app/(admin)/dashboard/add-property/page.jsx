// src/app/_components/pages/PropertyForm.jsx
"use client";
import React, { useState } from "react";
import { useCreateProperty } from "../../../hooks/useCreateProperty.js";
//import GenericForm from "../../../_components/molecules/GenericForm.jsx";

const PropertyForm = () => {
  const { createProperty, propertyCreated, error, loading } =
    useCreateProperty();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    type: "",
    bedrooms: "",
    airbnbUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "bedrooms" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProperty(formData);
  };

  return (
    <div>
      <h1>Create New Property</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {propertyCreated && (
        <p style={{ color: "green" }}>Property created successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bedrooms">Rooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.rooms}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="airbnbUrl">Airbnb URL:</label>
          <input
            type="url"
            id="airbnbUrl"
            name="airbnbUrl"
            value={formData.airbnbUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Create Property
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
