import { Types } from "mongoose";
import { VanDocType } from "../data/types";
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
  lastName: string;
  email: string;
  password: string;
  address: string;
  country: string;
  city: string;
  coordinates: [number, number];
};

export type AuthUserType = {
  id: string;
  role: string;
};

export type ReturnedFullName = {
  name: string;
  lastName: string;
};

export type SanitizedVanWithRating = Omit<
  VanDocType,
  "reviews" | "_id" | "_v"
> & {
  reviews: ReturnedVanReview[];
  averageRating: number;
};

export type ReturnedVanReview = {
  comment: string;
  rating: number;
  author: string;
};
