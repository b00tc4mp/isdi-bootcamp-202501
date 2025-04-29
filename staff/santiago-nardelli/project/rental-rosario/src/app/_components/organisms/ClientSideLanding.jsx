"use client";

import React, { useState } from "react";
import Logo from "../atoms/Logo.jsx";
import WelcomePhrase from "../molecules/WelcomePhrase.jsx";
import FilterNavbar from "../molecules/FilterNavbar.jsx";
import GridCards from "../atoms/GridCards.jsx";
import Card from "../molecules/PropertyCard.jsx";
import dynamic from "next/dynamic";

const ImageCarousel = dynamic(() => import("../molecules/ImageCarrusel.jsx"), {
  ssr: false,
});
const InteractiveMap = dynamic(() => import("../atoms/InteractiveMap.jsx"), {
  ssr: false,
});

const ClientSideLanding = ({ initialProperties }) => {
  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);

  const handleFilterByType = (type) => {
    const filtered = initialProperties.filter(
      (prop) => prop.type === type || type === "all"
    );
    setFilteredProperties(filtered);
  };

  const handleFilterByRooms = (rooms) => {
    const filtered = initialProperties.filter(
      (prop) => prop.rooms >= parseInt(rooms) || rooms === "all"
    );
    setFilteredProperties(filtered);
  };

  const backgroundImage = "/images/rosario-santa-fe-argentina.webp";
  const staticMapImage = "/images/mapa.webp";

  return (
    <div>
      <div className="relative h-screen bg-gray-100 overflow-hidden">
        <ImageCarousel imageUrl={backgroundImage} />
        <div className="absolute top-4 left-4 z-10">
          <Logo />
        </div>
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-right z-10">
          <WelcomePhrase />
        </div>
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-1/2 z-10">
          <InteractiveMap staticMapUrl={staticMapImage} />
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-white shadow-md transition duration-300">
        <FilterNavbar
          onFilterByType={handleFilterByType}
          onFilterByRooms={handleFilterByRooms}
        />
      </div>

      <div className="py-8">
        <h1>Todas las Propiedades</h1>
        <GridCards>
          {filteredProperties.map((property) => (
            <Card key={property.id} {...property} />
          ))}
        </GridCards>
      </div>
    </div>
  );
};

export default ClientSideLanding;
