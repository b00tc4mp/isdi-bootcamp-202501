import React from "react";
import { getAllPropertiesRequest } from "./_logic/functions/getAllPropertiesRequest.js";
import { getFilteredPropertiesRequest } from "./_logic/functions/getFilteredPropertiesRequest.js";
import PropertyList from "./_components/organisms/PropertyList.jsx";
import PropertyFilterNavbar from "./_components/molecules/PropertyFilterNavbar.jsx";
import HeroSection from "./_components/organisms/HeroSection.jsx";
import Header from "./_components/molecules/Header.jsx";
import { errors } from "com";

const { SystemError } = errors;

async function getProperties(searchParamsPromise) {
  try {
    const searchParams = await searchParamsPromise;
    const hasFilters = Object.keys(searchParams).length > 0;

    const filtersObject = hasFilters
      ? Object.fromEntries(
          Object.entries(searchParams).map(([key, value]) => [
            key,
            String(value),
          ])
        )
      : {};

    const properties = hasFilters
      ? await getFilteredPropertiesRequest(filtersObject)
      : await getAllPropertiesRequest();

    return properties;
  } catch (error) {
    if (error instanceof SystemError) {
      console.error("Error en el sistema:", error.message);
    } else {
      console.error("Error inesperado:", error);
    }

    return [];
  }
}

export default async function Home({ searchParams }) {
  const initialProperties = await getProperties(searchParams);
  console.log("initialProperties ==>", initialProperties);
  const hasError = initialProperties.length === 0;

  return (
    <div className="relative">
      <Header className="absolute top-0 left-0 right-0 z-30" />
      <HeroSection />
      <PropertyFilterNavbar />
      {hasError ? (
        <p className="text-red-500">
          Hubo un error al cargar las propiedades. Por favor, intenta nuevamente
          más tarde.
        </p>
      ) : (
        <PropertyList properties={initialProperties} />
      )}
    </div>
  );
}
