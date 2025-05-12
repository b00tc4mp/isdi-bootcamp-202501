import { LocationError } from "com/errors";

export const getCityCountryFromCoords = async (
  longitude: number,
  latitude: number
): Promise<{ city: string; country: string }> => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}${
    longitude >= 0 ? "+" : ""
  }${longitude}/nearbyCities?limit=1`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
    },
  });

  if (!response.ok) {
    throw new LocationError(`GeoDB API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data?.data?.length) {
    throw new LocationError("No location found for the given coordinates");
  }

  const nearest = data.data[0];
  return {
    city: nearest.city,
    country: nearest.country,
  };
};
