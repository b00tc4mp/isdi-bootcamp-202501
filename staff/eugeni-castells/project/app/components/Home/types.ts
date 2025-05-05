import { ReturnedVansType } from "@/com/types";

export type VanListProps = {
  vans: ReturnedVansType[];
};

export type FilterMenuProps = {
  onAcceptFilters: (filters: FilterStateType) => void;
  onLeftArrowClick: () => void;
  onResetFilters: () => void;
};

export type FilterStateType = {
  beds: string;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid" | "all";
  accessible: boolean;
  toilet: "portable" | "fixed" | "none" | "all";
  shower: boolean;
  heat: boolean;
  kitchen: boolean;
  airConditioning: boolean;
  fridge: boolean;
  travellers: string;
};
