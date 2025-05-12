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
  fuelType: Fuel;
  storage: string;
};

export type VehicleFeatures = {
  heating: boolean;
  airConditioning: boolean;
  insideKitchen: boolean;
  fridge: boolean;
  toilet: "fixed" | "portable" | "none";
  shower: boolean;
};

type Fuel = "petrol" | "diesel" | "electric" | "hybrid";

export type EditableImage = {
  id: string;
  uri: string;
  path?: string;
  isLocal: boolean; // true si prové de l’ImagePicker
};
