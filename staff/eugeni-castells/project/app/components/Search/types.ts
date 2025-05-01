export type AddBoxProps = {
  text: string;
  displayText: string;
  type: BoxType;
  onPressed?: () => void;
};

export type BoxType = "location" | "calendar" | "travellers";

export type SelectedDate = {
  start: ReturnedFormattedDay | null;
  end: ReturnedFormattedDay | null;
};

export type CalendarPropsType = {
  onAcceptDates: (dateRange: SelectedDate) => void;
};

export type ReturnedFormattedDay = {
  month: string | null;
  number: string | null;
  date: Date | null;
} | null;

export type SelectedLocation = {
  name: string;
  coordinates: [number, number];
} | null;

export type DestinationBoxProp = {
  onSearchClick: (location: SelectedLocation) => void;
};
