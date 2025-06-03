import errors, { SystemError } from "@/com/errors";
import { data } from "@/data";
import { ReturnedExchangesObject } from "@/com/types";
import { getApiUrl } from "@/getApiUrl";

export const getUserExchanges = async (): Promise<ReturnedExchangesObject> => {
  const token = await data.getToken();

  const apiUrl = getApiUrl();
  return fetch(`${apiUrl}/users/self/trips`, {
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
          .then((body: ReturnedExchangesObject) => {
            const exchanges = body;

            exchanges.pendingRequests?.all?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });
            exchanges.pendingRequests?.toUser?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });
            exchanges.pendingRequests?.user?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });

            exchanges.trips?.all?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });
            exchanges.trips?.user?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });
            exchanges.trips?.vans?.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });

            return exchanges;
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
