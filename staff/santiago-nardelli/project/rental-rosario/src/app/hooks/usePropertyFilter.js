"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const usePropertyFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
  const [type, setType] = useState(searchParams.get("type") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  */
  const [travelers, setTravelers] = useState(() => {
    const initial = searchParams.get("travelers") || "";
    return initial === "all" ? "" : initial; // Normalizar "all" a ""
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    /*
    if (name === "type") setType(value);
    if (name === "bedrooms") setBedrooms(value);
    */
    if (name === "travelers") setTravelers(value);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    /*
    if (type && type !== "all") params.set("type", type);
    if (bedrooms && bedrooms !== "all") params.set("bedrooms", bedrooms);
    */
    // Si el valor de travelers es válido, lo agregamos a los parámetros
    // Normaliza 4+ a 4 para el backend
    const normalizedTravelers = travelers;

    if (
      normalizedTravelers &&
      normalizedTravelers !== "all" &&
      !isNaN(Number(normalizedTravelers))
    ) {
      params.set("travelers", normalizedTravelers);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setTravelers("");
    router.replace(pathname, { scroll: false });
  };

  return {
    travelers,
    handleFilterChange,
    applyFilters,
    resetFilters,
  };
};

export default usePropertyFilter;
