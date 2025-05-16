import React, { Suspense } from "react";
import { getAllPropertiesRequest } from "./_logic/functions/getAllPropertiesRequest.js";
import { getFilteredPropertiesRequest } from "./_logic/functions/getFilteredPropertiesRequest.js";
import PropertyList from "./_components/organisms/PropertyList.jsx";
import PropertyFilterNavbar from "./_components/molecules/PropertyFilterNavbar.jsx";
import HeroSection from "./_components/organisms/HeroSection.jsx";
import Header from "./_components/molecules/Header.jsx";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

export const dynamic = "force-dynamic";

async function getProperties(searchParams) {
  console.log("getProperties: Inicio");

  try {
    const resolvedSearchParams = await searchParams;
    const hasFilters = Object.keys(resolvedSearchParams).length > 0;

    const filtersObject = hasFilters
      ? Object.fromEntries(
          Object.entries(resolvedSearchParams).map(([key, value]) => [
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
      console.error("Error del sistema:", error);
    } else if (error instanceof NotFoundError) {
      console.error("No se encontraron propiedades:", error);
    } else {
      console.error("Error inesperado:", error);
    }
    return [];
  }
}
export default async function Home({ searchParams }) {
  console.log("Home: Inicio");

  const initialProperties = await getProperties(searchParams);

  console.log("Home: initialProperties ==>", initialProperties);
  const hasError = initialProperties.length === 0;

  const jsx = (
    <div className="relative">
      <Header className="absolute top-0 left-0 right-0 z-30 " />
      <HeroSection />
      <Suspense fallback={<p>Cargando filtros...</p>}>
        <PropertyFilterNavbar />
      </Suspense>
      {hasError ? (
        <div className="text-center mt-8">
          <p className="text-red-500">
            {initialProperties.length === 0
              ? "No se encontraron propiedades con los filtros especificados."
              : "Hubo un error al cargar las propiedades. Por favor, intenta nuevamente más tarde."}
          </p>
        </div>
      ) : (
        <PropertyList properties={initialProperties} />
      )}
    </div>
  );

  return jsx;
}
