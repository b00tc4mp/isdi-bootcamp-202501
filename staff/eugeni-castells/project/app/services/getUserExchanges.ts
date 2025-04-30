import errors, { SystemError } from "@/com/errors";
import { data } from "@/data";
import { ReturnedExchanges, ReturnedExchangesObject } from "@/com/types";

export const getUserExchanges = async (): Promise<ReturnedExchangesObject> => {
  const token = await data.getToken();

  return fetch(`${process.env.EXPO_PUBLIC_API_URL}/self/trips`, {
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

            exchanges.pendingRequests.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });

            exchanges.trips.forEach((exchange) => {
              exchange.createdAt = new Date(exchange.createdAt);
              if (exchange.modifiedAt)
                exchange.modifiedAt = new Date(exchange.modifiedAt);
            });

            exchanges.userRequests.forEach((exchange) => {
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
