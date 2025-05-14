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
  images: ReturnedImagesFromServer[];
  trips: Types.ObjectId[];
  createdAt: Date;
  modifiedAt: Date | null;
  price: number;
  reviews: Types.ObjectId[];
  maxTravellers: number;
  location: {
    id: Types.ObjectId;
    address: string;
    city: string;
    country: string;
  };
  averageRating: number;
};

export type VanDetailInfo = {
  id: string;
  images: ReturnedImagesFromServer[];
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
  accessible: boolean;
  windows: number;
  doors: number;
  heating: boolean;
  airConditioning: boolean;
  bedCount: number;
  insideKitchen: boolean;
  fridge: boolean;
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
  occupiedDates: string[] | [];
};

export type ReturnedImagesFromServer = {
  url: string;
  path: string;
};

export type ReturnedJsonVanDetailInfo = {
  id: string;
  images: ReturnedImagesFromServer[];
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
  accessible: boolean;
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
  occupiedDates: string[] | [];
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

export type ReturnedExchanges = {
  id: string;
  owner: {
    id: string;
    name: string;
    lastName: string;
    isUser: boolean;
  };
  confirmStatus: TripConfirmStatus;
  startDate: string;
  endDate: string;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
  renter: {
    id: string;
    name: string;
    lastName: string;
  };
};

export type ReturnedExchangesObject = {
  trips: {
    all: ReturnedExchanges[] | [];
    user: ReturnedExchanges[] | [];
    vans: ReturnedExchanges[] | [];
  };
  pendingRequests: {
    all: ReturnedExchanges[] | [];
    user: ReturnedExchanges[] | [];
    toUser: ReturnedExchanges[] | [];
  };
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
  modifiedAt: string | null;
}[];

export type ReturnedChat = {
  id: string;
  createdAt: string;
  modifiedAt: null | string;
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

export type ReturnedSanitizedChat = {
  id: string;
  createdAt: Date;
  modifiedAt: null | Date;
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
  history: ReturnedSanitizedChatMessages;
};

export type ReturnedSanitizedChatMessages = {
  text: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    lastName: string;
  };
  own: boolean;
  id: string;
  modifiedAt: Date | null;
}[];

export type ReturnedSanitizedChatMessage = {
  text: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    lastName: string;
  };
  own: boolean;
  id: string;
  modifiedAt: Date | null;
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

export type VanImageType = {
  id: string;
  uri: string;
};
