import { format } from "date-fns";

export function getFormattedDate(givenDate: Date): {
  month: string;
  number: string;
  year: string;
  date: Date;
} {
  const month = format(givenDate, "MMMM");
  const day = format(givenDate, "d");
  const year = format(givenDate, "yyyy");
  const date = givenDate;

  return { month, number: day, year, date };
}
