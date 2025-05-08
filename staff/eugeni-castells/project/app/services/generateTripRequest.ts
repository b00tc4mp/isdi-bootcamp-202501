import { validate } from "@/com";
import { SelectedDatesInTripRequest } from "./types";
import { data } from "@/data";
import errors, { SystemError } from "@/com/errors";
import { getApiUrl } from "@/getApiUrl";

export const generateTripRequest = (
  tripInfo: {
    selectedDates: SelectedDatesInTripRequest;
    totalPrice: number;
  },
  vanId: string
) => {
  validate.date(tripInfo.selectedDates.startDate);
  validate.date(tripInfo.selectedDates.endDate);
  validate.id(vanId, "van id");

  const apiUrl = getApiUrl();

  return (async () => {
    const token = await data.getToken();
    try {
      await fetch(`${apiUrl}/vans/${vanId}/trip-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tripInfo }),
      }).then((response) => {
        if (response.status === 200) return;

        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { error, message } = body;

            const constructor = errors[error as keyof typeof errors];

            throw new constructor(message);
          });
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
