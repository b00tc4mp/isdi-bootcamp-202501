import { SystemError } from "@/com/errors";
import { data } from "@/data";

import { ReturnedVansType } from "@/com/types";

export const getVans = async (): Promise<ReturnedVansType[]> => {
  const token = await data.getToken();

  return fetch(`${process.env.EXPO_PUBLIC_API_URL}/vans`, {
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

          const constructor = error.name;

          throw new constructor(message);
        });
    });
};
