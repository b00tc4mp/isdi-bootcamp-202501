import { Types } from "mongoose";

type Toilet = "portable" | "fixed" | "none";

type Shower = "inside" | "outside" | "none";

type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

type PointDocType = {
  type: "Point";
  coordinates: [number, number];
};

type VanDocType = {
  _id: Types.ObjectId;
  windows: number;
  description: string;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  bedCount: number;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: Toilet;
  shower: Shower;
  fuelType: Fuel;
  storage: number;
  brand: string;
  model: string;
  year: Date; //Should be string, number or date?
  accessible: boolean;
  point: PointDocType;
  legal: Types.ObjectId[];
  images: string[];
  trips: Types.ObjectId[];
  createdAt: Date;
  modifiedAt: Date | null;
  price: number;
  reviews: Types.ObjectId[];
  location: Types.ObjectId;
};

type DestinationBoxProp = {
  onSearchClick: (location: SelectedLocation) => void;
};

type SelectedLocation = {
  name: string;
  coordinates: [number, number];
};

export {
  Types,
  Toilet,
  Shower,
  Fuel,
  PointDocType,
  VanDocType,
  DestinationBoxProp,
  SelectedLocation,
};

export type SelectedDate = {
  start: ReturnedFormattedDay | null;
  end: ReturnedFormattedDay | null;
};

export type ReturnedFormattedDay = {
  month: string;
  number: string;
  date: Date;
} | null;

export type RegisterVanParam = {
  features: VehicleFeatures;
  traits: VehicleTraitsWithNumbers;
  model: string;
  brand: string;
  price: number;
  description: string;
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

export type VehicleFeatures = {
  heating: boolean;
  airConditioning: boolean;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: "fixed" | "portable" | "none";
  shower: boolean;
};

export type PopulatedReview = {
  _id?: string;
  id: string;
  comment: string;
  rating: number;
  author: PopulatedAuthor;
};

export type ReturnedSanitizedReviews = {
  reviews: PopulatedReview[];
  averageRating: number;
};

export type PopulatedAuthor = {
  name: string;
  lastName: string;
};
