import { validate, constant } from "@/com";
import { SystemError } from "@/com/errors";
import { GeoDBResponse } from "./types";
const { FETCHED_CITIES_SHOWN } = constant;

export const filterLocation = (location: string): Promise<GeoDBResponse> => {
  validate.string(location, "location");

  return fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${location}&limit=${FETCHED_CITIES_SHOWN}&sort=-population&types=CITY`,
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
