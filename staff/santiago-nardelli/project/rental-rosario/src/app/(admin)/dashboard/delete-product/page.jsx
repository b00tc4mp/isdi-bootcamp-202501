import React from "react";
import DeleteButton from "./atoms/DeleteButton"; // Asegúrate de la ruta correcta

const PropertyCard = ({ property, onPropertyDeleted }) => {
  // ... (información de la propiedad) ...

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      {/* ... (información de la propiedad) ... */}
      <DeleteButton
        propertyId={property.id}
        onDeleteSuccess={onPropertyDeleted}
        className="mt-4" // Ejemplo de clase adicional para el margen superior
      />
      {/* ... (otros elementos) ... */}
    </div>
  );
};
