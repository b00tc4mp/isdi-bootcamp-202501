import { validate } from "@/com";
import { SystemError } from "@/com/errors";
import { VanDetailInfo, ReturnedJsonVanDetailInfo } from "@/com/types";
import { data } from "@/data";

export const getVanById = (id: string): Promise<VanDetailInfo> => {
  validate.id(id, "van id");

  return (async () => {
    const token = await data.getToken();

    return fetch(`${process.env.EXPO_PUBLIC_API_URL_ALXII}/vans/${id}`, {
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
            .then((van: ReturnedJsonVanDetailInfo) => {
              const { createdAt, modifiedAt, ...sanitizedVan } = van;

              let finalVan: VanDetailInfo = {
                ...sanitizedVan,
                createdAt: new Date(createdAt),
                modifiedAt: modifiedAt ? new Date(modifiedAt) : null,
              };

              return finalVan;
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
  })();
};
