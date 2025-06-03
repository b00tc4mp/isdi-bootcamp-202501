export type BookCalendarProps = {
  onReturnClick: () => void;
  onAcceptButton: ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => void;
  occupiedDates: string[] | [];
};

export type BookIndexProps = {
  onVanDetailScreenNavigation: () => void;
  price: number;
  location: {
    city: string;
    country: string;
  };
  occupiedDates: string[] | [];
};

export type TripSummaryProps = {
  tripInfo: {
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    location: {
      city: string;
      country: string;
    };
    onDatesClick: () => void;
    onRequestTripClick: () => void;
  };
};
