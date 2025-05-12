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
    if (name === "type") setType(value);
    if (name === "bedrooms") setBedrooms(value);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (type && type !== "all") params.set("type", type);
    if (bedrooms && bedrooms !== "all") params.set("bedrooms", bedrooms);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setType("");
    setBedrooms("");
    router.replace(pathname, { scroll: false });
  };

  return {
    type,
    bedrooms,
    handleFilterChange,
    applyFilters,
    resetFilters,
  };
};

export default usePropertyFilter;
