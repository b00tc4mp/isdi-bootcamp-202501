import { errors } from "@/com";
import { SelectedDate, SelectedLocation } from "@/components/Search/types";
import { VehicleFeatures } from "@/app/(tabs)/profile/types";
import { VanImageType } from "@/com/types";
export type RegisterUserInputType = {
  name: string;
  email: string;
  password: string;
  address: string;
  city: {
    name: string;
    latitude: number;
    longitude: number;
  };
  country: {
    name: string;
  };
  coordinates: [number, number];
};

export type GeoDBResponse = {
  data: GeoDBResponseCity[];
};

export type GeoDBResponseCity = {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  region: string;
};

export type GeoDBCountry = {
  code: string;
  name: string;
  currencyCodes: string[];
  wikiDataId: string;
};

export type GeoDBCountryResponse = {
  data: GeoDBCountry[];
};

export type GetVansLocationParam = SelectedLocation;

export type GetVansDateRangeParam = SelectedDate;

export type GetVansTravellersParam = number;

export type SelectedDatesInTripRequest = {
  startDate: Date;
  endDate: Date;
};

export type ErrorKey = keyof typeof errors;

export type RegisterVanParam = {
  features: VehicleFeatures;
  traits: VehicleTraitsWithNumbers;
  model: string;
  brand: string;
  price: number;
  description: string;
  images: VanImageType[];
};

export type VehicleTraitsWithNumbers = {
  doors: number;
  bedCount: number;
  windows: number;
  maxTravellers: number;
  storage: number;
  fuelType: string;
  accessible: boolean;
};
