import { Types } from "mongoose";

export type Toilet = "portable" | "fixed" | "none";

export type Shower = "inside" | "outside" | "none";

export type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

export type TripConfirmStatus = "pending" | "rejected" | "accepted";
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

export type ReturnedVansType = {
  id: string;
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
  location: {
    id: Types.ObjectId;
    address: string;
    city: string;
    country: string;
  };
};
export type VanDetailInfo = {
  id: string;
  images: string[];
  vehicleTraits: {
    accessible: boolean;
    doors: number;
    bedCount: number;
    storage: number;
    fuelType: Fuel;
    windows: number;
  };
  features: {
    heating: boolean;
    shower: Shower;
    airConditioning: boolean;
    insideKitchen: boolean;
  };
  model: string;
  brand: string;
  description: string;
  owner: { name: string; lastName: string };
  accessible: boolean;
  windows: number;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  bedCount: number;
  maxTravellers: number;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: Toilet;
  shower: Shower;
  fuelType: Fuel;
  storage: number;
  price: number;
  averageRating: number;
  reviewsCount: number;
  location: {
    city: string;
    country: string;
  };
  reviews: PopulatedReview[] | [];
  createdAt: Date;
  modifiedAt: Date | null;
};

export type ReturnedJsonVanDetailInfo = {
  id: string;
  images: string[];
  vehicleTraits: {
    accessible: boolean;
    doors: number;
    bedCount: number;
    storage: number;
    fuelType: Fuel;
    windows: number;
  };
  features: {
    heating: boolean;
    shower: Shower;
    airConditioning: boolean;
    insideKitchen: boolean;
  };
  model: string;
  brand: string;
  description: string;
  owner: { name: string; lastName: string };
  accessible: boolean;
  windows: number;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  bedCount: number;
  maxTravellers: number;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: Toilet;
  shower: Shower;
  fuelType: Fuel;
  storage: number;
  price: number;
  averageRating: number;
  reviewsCount: number;
  location: {
    city: string;
    country: string;
  };
  reviews: PopulatedReview[] | [];
  createdAt: string;
  modifiedAt: string | null;
};

export type PopulatedReview = {
  _id?: string;
  id: string;
  comment: string;
  rating: number;
  author: PopulatedAuthor;
};

export type PopulatedAuthor = {
  name: string;
};

export type ReturnedExchanges = {
  id: string;
  owner: {
    id: Types.ObjectId;
    name: string;
    lastName: string;
 
  };
  confirmStatus: TripConfirmStatus;
  startDate: Date;
  endDate: Date;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
};

export type ReturnedExchangesObject={
  pendingRequests:
}