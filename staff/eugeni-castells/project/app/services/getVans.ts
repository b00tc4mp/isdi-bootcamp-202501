import errors, { SystemError } from "@/com/errors";
import { data } from "@/data";

import { ReturnedVansType } from "@/com/types";
import { generateUrl } from "@/app/utils/generateUrl";

export const getVans = async (
  longitude: string | null,
  latitude: string | null,
  startDate: string | null,
  endDate: string | null,
  travellers: string | null
): Promise<ReturnedVansType[]> => {
  const token = await data.getToken();

  const url = generateUrl(`/vans`, {
    longitude,
    latitude,
    startDate,
    endDate,
    travellers,
  });

  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
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
          .then((body: ReturnedVansType[]) => {
            const vans = body;

            vans.forEach((van) => {
              van.createdAt = new Date(van.createdAt);
              if (van.modifiedAt) van.modifiedAt = new Date(van.modifiedAt);
            });
            return vans;
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
};
