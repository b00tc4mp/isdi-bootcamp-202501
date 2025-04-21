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
