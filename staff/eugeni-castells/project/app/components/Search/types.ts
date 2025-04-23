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

export type GeneratedDayByCalendar = Date | null;

export type ReturnedFormattedDay = {
  month: string;
  number: string;
  date: Date;
} | null;

export type SelectedLocation = {
  name: string;
  coordinates: [number, number];
} | null;

export type DestinationBoxProp = {
  onSearchClick: (location: SelectedLocation) => void;
};
