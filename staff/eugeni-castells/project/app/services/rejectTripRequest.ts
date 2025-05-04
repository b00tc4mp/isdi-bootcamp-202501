import { validate } from "@/com";
import { data } from "@/data";
import errors, { SystemError } from "@/com/errors";

export const rejectTripRequest = (tripId: string): Promise<void> => {
  validate.id(tripId, "van id");

  return (async () => {
    const token = await data.getToken();
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/trips/${tripId}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
