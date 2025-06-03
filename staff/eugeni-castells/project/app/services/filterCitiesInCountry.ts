import { validate, constant } from "@/com";
import { SystemError } from "@/com/errors";
import { GeoDBResponse } from "./types";

const { FETCHED_ITEMS_SHOWN } = constant;

export const filterCitiesInCountry = (
  location: string,
  countryCode: string
): Promise<GeoDBResponse> => {
  validate.string(location, "location");
  validate.string(countryCode, "country code");

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${countryCode}&namePrefix=${location}&limit=${FETCHED_ITEMS_SHOWN}&sort=-population`;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_X_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": process.env.EXPO_PUBLIC_RAPIDAPI_HOST!,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorBody = await response.text();
        throw new SystemError(
          `GeoDB API error: ${response.status} - ${errorBody}`
        );
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw new SystemError(error.message);
    });
};
