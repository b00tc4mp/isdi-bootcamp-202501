export type ExpoImagePickerAsset = {
  uri: string;
  id: string;
};

export type VehicleTraits = {
  accessible: boolean;
  windows: string;
  doors: string;
  bedCount: string;
  maxTravellers: string;
  fuelType: string;
  storage: string;
};

export type VehicleFeatures = {
  heating: boolean;
  airConditioning: boolean;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: "fixed" | "portable" | "none";
  shower: "inside" | "outside" | "none";
};
