import { Types } from "mongoose";

type Roles = "regular" | "moderator" | "admin";

type Toilet = "portable" | "fixed" | "none";

type Shower = "inside" | "outside" | "none";

type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

type PaymentStatus = "pending" | "payed" | "rejected";

type TripConfirmStatus = "pending" | "accepted" | "rejected";

type PaymentMethod = "road points" | "currency";

type UserDocType = {
  _id: Types.ObjectId;
  location: Types.ObjectId;
  role: Roles;
  name: string;
  lastName: string;
  email: string;
  password: string;
  vans: Types.ObjectId[];
  trips: Types.ObjectId[];
  createdAt: Date;
  modifiedAt: Date | null;
  roadPoints: number;
  chats: Types.ObjectId[];
};

type VanDocType = {
  _id: Types.ObjectId;
  windows: number;
  description: string;
  doors: number;
  heating: boolean;
  owner: Types.ObjectId;
  airConditioning: boolean;
  bedCount: number;
  maxTravellers: number;
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

type TripDocType = {
  _id: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  van: Types.ObjectId;
  vanOwner: Types.ObjectId;
  renter: Types.ObjectId;
  price: number;
  issues: Types.ObjectId[];
  location: Types.ObjectId[];
  agreements: Types.ObjectId[];
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  confirmStatus: TripConfirmStatus;
  createdAt: Date;
  modifiedAt: Date | null;
};

type DocDocType = {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  third?: Types.ObjectId;
  createdAt: Date;
  modifiedAt: Date | null;
};

type ChatDocType = {
  _id: Types.ObjectId;
  history: Types.ObjectId[];
  participants: [Types.ObjectId, Types.ObjectId];
  createdAt: Date;
  modifiedAt: Date | null;
};

type ChatCommentDocType = {
  _id: Types.ObjectId;
  text: string;
  author: Types.ObjectId;
  createdAt: Date;
  modifiedAt: Date | null;
};

type ReviewDocType = {
  _id: Types.ObjectId;
  rating: number;
  comment: string;
  author: Types.ObjectId;
  createdAt: Date;
  modifiedAt: Date | null;
};

type LocationDocType = {
  _id: Types.ObjectId;
  address: string;
  city: string;
  region: string;
  country: string;
  point: PointDocType;
};

type PointDocType = {
  type: "Point";
  coordinates: [number, number];
};

type VanImageType = {
  id: string;
  uri: string;
};

export {
  Roles,
  Toilet,
  Shower,
  Fuel,
  PaymentStatus,
  PaymentMethod,
  TripConfirmStatus,
  UserDocType,
  DocDocType,
  LocationDocType,
  ReviewDocType,
  TripDocType,
  VanDocType,
  PointDocType,
  ChatDocType,
  ChatCommentDocType,
  VanImageType,
};
