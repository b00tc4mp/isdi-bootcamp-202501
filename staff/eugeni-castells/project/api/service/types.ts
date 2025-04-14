import { Fuel, Shower, Toilet } from "../data/types";

export type NewVanInfo = {
  model: string;
  brand: string;
  year: Date;
  images?: string[];
  accessible?: boolean;
  price?: number;
  reviews?: string[];
  location: string;
  legal?: string[];
  trips?: string[];
  windows: number;
  doors: number;
  heating?: boolean;
  airConditioning?: boolean;
  bedCount: number;
  insideKitchen?: boolean;
  fridge?: boolean;
  toilet?: Toilet;
  shower: Shower;
  fuelType: Fuel;
  storage?: number;
  createdAt?: Date;
  modifiedAt?: Date | null;
};

export type NewUserInfo = {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  country: string;
  city: string;
  point: { type: "Point"; coordinates: [number, number] };
};
