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
  const startTime = Date.now();
  console.log("getProperties: Inicio");
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

    const propertiesStartTime = Date.now();
    const properties = hasFilters
      ? await getFilteredPropertiesRequest(filtersObject)
      : await getAllPropertiesRequest();
    const propertiesEndTime = Date.now();
    console.log(
      `getProperties: Obtención de propiedades completada en ${
        propertiesEndTime - propertiesStartTime
      }ms`
    );

    return properties;
  } catch (error) {
    if (error instanceof SystemError) {
      console.error("Error en el sistema:", error.message);
    } else {
      console.error("Error inesperado:", error);
    }
    return [];
  } finally {
    const endTime = Date.now();
    console.log(`getProperties: Finalizado en ${endTime - startTime}ms`);
  }
}

export default async function Home({ searchParams }) {
  const homeStartTime = Date.now();
  console.log("Home: Inicio");

  const propertiesStartTime = Date.now();
  const initialProperties = await getProperties(searchParams);
  const propertiesEndTime = Date.now();
  console.log(
    `Home: getProperties completado en ${
      propertiesEndTime - propertiesStartTime
    }ms`
  );

  console.log("Home: initialProperties ==>", initialProperties);
  const hasError = initialProperties.length === 0;

  const renderStartTime = Date.now();
  const jsx = (
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
  const renderEndTime = Date.now();
  console.log(
    `Home: Render JSX completado en ${renderEndTime - renderStartTime}ms`
  );

  const homeEndTime = Date.now();
  console.log(`Home: Finalizado en ${homeEndTime - homeStartTime}ms`);

  return jsx;
}
