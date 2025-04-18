import { Types } from "mongoose";

export type Toilet = "portable" | "fixed" | "none";

export type Shower = "inside" | "outside" | "none";

export type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

type PointDocType = {
  type: "Point";
  coordinates: [number, number];
};

export type VanDocType = {
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
