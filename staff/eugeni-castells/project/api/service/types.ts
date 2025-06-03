import { Types } from "mongoose";
import { Fuel, Shower, Toilet, VanImageType } from "../data/types";

export type NewVanInfo = {
  model: string;
  brand: string;
  year?: Date;
  images: string[] | [];
  accessible: boolean;
  price?: number;
  reviews?: string[] | [];
  location?: string;
  legal?: string[];
  trips?: string[];
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
  createdAt?: Date;
  modifiedAt?: Date | null;
};

export type NewUserInfo = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  country?: string;
  city?: string;
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

export type GetVansDateFilterPropsType = {
  start: Date | null;
  end: Date | null;
};

export type PopulatedTrip = {
  _id: Types.ObjectId;
  startDate: Date;
  endDate: Date;
};

export type ReturnedPopulatedVan = {
  _id: Types.ObjectId;
  id: string;
  windows: number;
  description: string;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  bedCount: number;
  maxTravellers: number;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: Toilet;
  shower: boolean;
  fuelType: Fuel;
  storage: number;
  brand: string;
  model: string;
  year?: Date;
  accessible: boolean;
  legal: Types.ObjectId[];
  createdAt: Date;
  modifiedAt: Date | null;
  price: number;
  reviews: PopulatedReview[] | [];
  location: PopulatedLocation;
  trips: PopulatedTrip[] | [];
  images: ReturnedImagesFromServer[];
};

export type SanitizedVanWithRating = Omit<
  ReturnedPopulatedVan,
  "reviews" | "_id" | "createdAt" | "modifiedAt"
> & {
  reviews: SanitizedReview[];
  averageRating: number | null;
  createdAt: Date;
  modifiedAt: null | Date;
};

export type ReturnedVanReview = {
  comment: string;
  rating: number;
  author: string;
};

export type PopulatedLocation = {
  id: string;
  _id?: Types.ObjectId;
  address: string;
  country: string;
  city: string;
};

export type PopulatedReview = {
  _id?: string;
  id: string;
  comment: string;
  rating: number | null;
  author: PopulatedAuthor;
};

export type ReturnedSanitizedReviews = {
  reviews: SanitizedReview[];
  averageRating: number | null;
};

export type PopulatedAuthor = {
  _id: Types.ObjectId;
  id: string;
  name: string;
  lastName: string;
};

export type SanitizedAuthor = {
  id: string;
  name: string;
  lastName: string;
};

export type SanitizedReview = {
  id: string;
  comment: string;
  rating: number | null;
  author: SanitizedAuthor;
};

export type TripRequestLocation = {
  coordinates: [number, number];
  city: string;
  country: string;
};

export type VanWithPopulatedTrips = {
  trips: PopulatedTrip[];
};

export type TripConfirmStatus = "pending" | "accepted" | "rejected";
export type PaymentStatus = "pending" | "payed" | "rejected";
export type PaymentMethod = "currency" | "road points";

export type RequestTripParams = {
  selectedDates: { startDate: Date; endDate: Date };
  paymentMethod?: PaymentMethod;
  totalPrice: number;
};

export type PopulatedVanReturnedById = {
  _id: string;
  image: string[];
  model: string;
  brand: string;
  description: string;
  owner: string;
  accessible: boolean;
  windows: number;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  becDount: number;
  maxTravellers: number;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: Toilet;
  shower: Shower;
  fuelType: Fuel;
  storage: number;
  price: number;
  rating: number;
  city: string;
  country: string;
  reviews: PopulatedReview[];
  createdAt: Date;
  modifiedAt: Date;
};

export type VanDetailInfo = {
  id: string;
  vehicleTraits: {
    accessible: boolean;
    doors: number;
    bedCount: number;
    storage: number;
    fuelType: Fuel;
    windows: number;
    maxTravellers: number;
  };
  features: {
    heating: boolean;
    shower: boolean;
    airConditioning: boolean;
    insideKitchen: boolean;
    toilet: Toilet;
  };
  model: string;
  brand: string;
  description: string;
  owner: { name: string; lastName: string };

  price: number;
  averageRating: number | null;
  reviewsCount: number;
  location: {
    city: string;
    country: string;
  };
  reviews: PopulatedReview[] | [];
  createdAt: Date;
  modifiedAt: Date | null;
  occupiedDates: Date[] | [];
};

export type ReturnedChatMessages = {
  text: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    lastName: string;
  };
  own: boolean;
  id: string;
}[];

export type ReturnedChat = {
  id: string;
  createdAt: string;
  modifiedAt: string | null;
  participants: {
    id: string;
    name: string;
    lastName: string;
  }[];
  interlocutor: {
    id: string;
    name: string;
    lastName: string;
  };
  history: ReturnedChatMessages;
};

export type PopulatedAllUserInfo = {
  _id: Types.ObjectId;
  location: {
    _id: Types.ObjectId;
    city: string;
    country: string;
  };
  name: string;
  lastName: string;
  email: string;
  password: string;
  vans: {
    _id: Types.ObjectId;
    model: string;
    brand: string;
    location: {
      _id: Types.ObjectId;
      city: string;
      country: string;
    };
    price: number;
  }[];
  createdAt: Date;
  modifiedAt: Date | null;
  roadPoints: number;
};

export type ReturnedAllUserInfo = {
  id: string;
  location: {
    id: string;
    city: string;
    country: string;
  };
  name: string;
  lastName: string;
  email: string;
  vans: {
    id: string;
    model: string;
    brand: string;
    location: {
      id: string;
      city: string;
      country: string;
    };
    price: number;
  }[];
  createdAt: Date;
  modifiedAt: Date | null;
  roadPoints: number;
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
  shower: boolean;
  fuelType: Fuel;
  storage: number;
  brand: string;
  model: string;
  year?: Date; //Should be string, number or date?
  accessible: boolean;
  legal: Types.ObjectId[];
  images: ReturnedImagesFromServer[];
  trips: PopulatedTrip[] | [];
  createdAt: Date;
  modifiedAt: Date | null;
  price: number;
  reviews: PopulatedReview[];
  maxTravellers: number;
  location: {
    id: string;
    address: string;
    city: string;
    country: string;
  };
  averageRating: number | null;
};

export type ReturnedImagesFromServer = {
  url: string;
  path: string;
};

type PointDocType = {
  type: "Point";
  coordinates: [number, number];
};
