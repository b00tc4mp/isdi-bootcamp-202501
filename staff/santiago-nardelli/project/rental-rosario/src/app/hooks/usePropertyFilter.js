// hooks/usePropertyFilter.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const usePropertyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "type":
        setType(value);
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

    if (type && type !== "") {
      // Añadir condición para omitir si es vacío
      params.set("type", type);
    }
    if (bedrooms && bedrooms !== "") {
      // Añadir condición para omitir si es vacío
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
    setBedrooms("");
    router.push("/");
  };

  return {
    type,
    bedrooms,
    setType,
    setBedrooms,
    handleFilterChange,
    applyFilters,
    resetFilters,
  };
};

export default usePropertyFilter;
