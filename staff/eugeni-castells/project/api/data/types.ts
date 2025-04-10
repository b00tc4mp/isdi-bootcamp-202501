type Roles = "regular" | "moderator" | "admin";

type Toilet = "portable" | "fixed" | "none";

type Shower = "inside" | "outside" | "none";

type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

type PaymentStatus = "pending" | "payed" | "rejected";

type TripConfirmStatus = "pending" | "payed" | "rejected";

type PaymentMethod = "road points" | "currency";

export {
  Roles,
  Toilet,
  Shower,
  Fuel,
  PaymentStatus,
  PaymentMethod,
  TripConfirmStatus,
};
