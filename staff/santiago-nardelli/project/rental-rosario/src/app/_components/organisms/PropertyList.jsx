// app/components/organisms/PropertyList.jsx
import React from "react";
import PropertyCard from "../molecules/PropertyCard";

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p>No se encontraron propiedades que coincidan con los filtros.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
