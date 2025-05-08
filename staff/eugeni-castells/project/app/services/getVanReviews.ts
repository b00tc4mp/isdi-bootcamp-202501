import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import { ReturnedSanitizedReviews } from "@/com/types";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const getVanReviews = (
  id: string
): Promise<ReturnedSanitizedReviews> => {
  validate.id(id, "van id");

  return (async () => {
    const token = await data.getToken();

    const url = getApiUrl();

    return fetch(`${url}/vans/${id}/reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        if (response.status === 200)
          return response
            .json()
            .catch((error) => {
              throw new SystemError(error.message);
            })
            .then((reviews: ReturnedSanitizedReviews) => {
              return reviews;
            });

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
  })();
};
