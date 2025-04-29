// _components/molecules/PropertyFilter.jsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PropertyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados locales para los valores de los filtros
  const [type, setType] = useState(searchParams.get("type") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "type":
        setType(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "bedrooms":
        setBedrooms(value);
        break;
      default:
        break;
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (type) {
      params.set("type", type);
    }
    if (location) {
      params.set("location", location);
    }
    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    }

    const newPathname = `/`;
    const newSearchParams = params.toString();
    const newUrl = `${newPathname}${
      newSearchParams ? `?${newSearchParams}` : ""
    }`;

    router.push(newUrl);
  };

  const resetFilters = () => {
    setType("");
    setLocation("");
    setBedrooms("");
    router.push("/");
  };

  return (
    <div className="property-filter">
      <h3>Filtrar Propiedades</h3>

      <div className="filter-control">
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="apartment">Apartamento</option>
          <option value="house">Casa</option>
          {/* Agrega más opciones de tipo según tus datos */}
        </select>
      </div>

      <div className="filter-control">
        <label htmlFor="location">Lugar:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleFilterChange}
          placeholder="Ingrese la ubicación"
        />
      </div>

      <div className="filter-control">
        <label htmlFor="bedrooms">Habitaciones:</label>
        <select
          id="bedrooms"
          name="bedrooms"
          value={bedrooms}
          onChange={handleFilterChange}
        >
          <option value="">Todas</option>
          <option value="0">Estudio</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

      <button onClick={applyFilters}>Aplicar Filtros</button>
      <button onClick={resetFilters}>Limpiar Filtros</button>
    </div>
  );
};

export default PropertyFilter;
