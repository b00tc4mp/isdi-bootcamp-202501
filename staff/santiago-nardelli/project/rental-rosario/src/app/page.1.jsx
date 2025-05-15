import React from "react";
import { getAllPropertiesRequest } from "./_logic/functions/getAllPropertiesRequest.js";
//import { getFilteredPropertiesRequest } from "./_logic/functions/getFilteredPropertiesRequest.js";
import PropertyList from "./_components/organisms/PropertyList.jsx";
import PropertyFilterNavbar from "./_components/molecules/PropertyFilterNavbar.jsx";
import HeroSection from "./_components/organisms/HeroSection.jsx";
import Header from "./_components/molecules/Header.jsx";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

export const dynamic = "force-dynamic";

export default async function Home() {
  console.log("getProperties: Inicio");
  let initialProperties = [];

  try {
    initialProperties = await getAllPropertiesRequest();
    console.log("Propiedades obtenidas:", initialProperties.length);
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    if (error instanceof SystemError) {
      return <p>Error del sistema. Por favor, intenta nuevamente más tarde.</p>;
    } else if (error instanceof NotFoundError) {
      return <p>No se encontraron propiedades.</p>;
    } else {
      return <p>Error desconocido. Por favor, intenta nuevamente más tarde.</p>;
    }
  }

  const jsx = (
    <div className="relative">
      <Header className="absolute top-0 left-0 right-0 z-30 " />
      <HeroSection />
      <PropertyFilterNavbar />

      <PropertyList properties={initialProperties} />
    </div>
  );

  return jsx;
}
