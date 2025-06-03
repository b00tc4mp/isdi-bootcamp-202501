import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import { VanDetailInfo, ReturnedJsonVanDetailInfo } from "@/com/types";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const getVanById = (id: string): Promise<VanDetailInfo> => {
  validate.id(id, "van id");

  const apiUrl = getApiUrl();
  return (async () => {
    const token = await data.getToken();

    return fetch(`${apiUrl}/vans/${id}`, {
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
            const constructor = errors[error as keyof typeof errors];
            throw new constructor(message);
          });
      });
  })();
};
