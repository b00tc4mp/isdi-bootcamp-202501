import React from "react";
import ClientSideLanding from "./_components/organisms/ClientSideLanding.jsx";
import { getAllPropertiesRequest } from "./_logic/functions/getAllPropertiesRequest.js";

async function getProperties() {
  try {
    const properties = await getAllPropertiesRequest();
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Page() {
  const initialProperties = await getProperties();

  return <ClientSideLanding initialProperties={initialProperties} />;
}
