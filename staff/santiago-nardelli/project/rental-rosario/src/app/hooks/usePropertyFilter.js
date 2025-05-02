// hooks/usePropertyFilter.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const usePropertyFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
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

    if (type && type !== "all") {
      // Añadir condición para omitir si es vacío
      params.set("type", type);
    }
    if (bedrooms && bedrooms !== "all") {
      // Añadir condición para omitir si es vacío
      params.set("bedrooms", bedrooms);
    }

    const newSearchParams = params.toString();
    // const newUrl = `${window.location.pathname}${
    //   newSearchParams ? `?${newSearchParams}` : ""
    // }`;

    router.replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  const resetFilters = () => {
    setType("");
    setBedrooms("");
    router.replace(pathname, { scroll: false });
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
