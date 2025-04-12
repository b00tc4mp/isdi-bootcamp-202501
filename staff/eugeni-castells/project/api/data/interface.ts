import { ObjectId } from "mongoose";

import {
  Fuel,
  PaymentMethod,
  PaymentStatus,
  Roles,
  Shower,
  Toilet,
  TripConfirmStatus,
} from "./types.js";

interface IUser {
  _id: ObjectId;
  role: Roles;
  name: string;
  username: string;
  email: string;
  password: string;
  vans: ObjectId[];
  trips: ObjectId[];
  createdAt: Date;
  modifiedAt: Date;
  roadPoints: Number;
}

interface IVan {
  _id: ObjectId;
  windows: number;
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
  legal: ObjectId[];
  images: string[];
  trips: ObjectId[];
  createdAt: Date;
  modifiedAt: Date;
  price: number;
  reviews: ObjectId[];
  location: ObjectId;
}

interface ITrip {
  _id: ObjectId;
  startDate: Date;
  endDate: Date;
  van: ObjectId;
  vanOwner: ObjectId;
  renter: ObjectId;
  price: number;
  issues: ObjectId[];
  location: ObjectId[];
  agreements: ObjectId[];
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  confirmStatus: TripConfirmStatus;
  createdAt: Date;
  modifiedAt: Date;
}

interface IDoc {
  content: string;
  author: ObjectId;
  third?: ObjectId;
  createdAt: Date;
  modifiedAt: Date;
}

interface IReview {
  rating: number[];
  comment: string;
  author: ObjectId;
  createdAt: Date;
  modifiedAt: Date;
}

interface ILocation {
  address: string;
  city: string;
  region: string;
  country: string;
  point: IPoint;
}

interface IPoint {
  type: "Point";
  coordinates: number[];
}

export { IUser, IDoc, ILocation, IReview, ITrip, IVan, IPoint };
