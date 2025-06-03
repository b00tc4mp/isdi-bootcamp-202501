// src/components/atoms/ModifyButton.js
import React, { useState } from "react";
import Modal from "../molecules/Modal"; // Asumiendo que tienes un componente Modal

const ModifyButton = ({ property, onPropertyUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Modificar
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {/* Aquí dentro irá el formulario de modificación */}
          <h2>Modificar Propiedad</h2>
          {/* Pasa los datos de la propiedad al formulario */}
          <PropertyFormModify
            property={property}
            onClose={handleCloseModal}
            onPropertyUpdated={onPropertyUpdated}
          />
        </Modal>
      )}
    </div>
  );
};

export default ModifyButton;
