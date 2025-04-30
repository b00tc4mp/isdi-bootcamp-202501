export type TripRequestProps = {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  location: {
    city: string;
    country: string;
  };
  vanModel: string;
  vanBrand: string;
};
