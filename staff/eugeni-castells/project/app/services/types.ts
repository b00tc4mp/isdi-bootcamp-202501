import { errors } from "@/com";
import { SelectedDate, SelectedLocation } from "@/components/Search/types";

export type RegisterUserInputType = {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  country: string;
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

export type GetVansLocationParam = SelectedLocation;

export type GetVansDateRangeParam = SelectedDate;

export type GetVansTravellersParam = number;

export type SelectedDatesInTripRequest = {
  startDate: Date;
  endDate: Date;
};

export type ErrorKey = keyof typeof errors;
