import { validate, constant } from "@/com";
import { SystemError } from "@/com/errors";
import { GeoDBCountryResponse, GeoDBResponse } from "./types";
const { FETCHED_ITEMS_SHOWN } = constant;

export const filterCountries = (
  location: string
): Promise<GeoDBCountryResponse> => {
  validate.string(location, "location");

  return fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix=${location}&limit=${FETCHED_ITEMS_SHOWN}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.EXPO_PUBLIC_X_RAPIDAPI_KEY!,
        "X-RapidAPI-Host": process.env.EXPO_PUBLIC_RAPIDAPI_HOST!,
      },
    }
  )
    .catch((error) => {
      console.error(error);

      throw new SystemError(error.message);
    })
    .then((response) => {
      return response.json();

      //TODO
      //Add response error logic
    })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((data) => {
      return data;
    });
};
