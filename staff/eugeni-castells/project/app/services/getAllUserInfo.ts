import errors, { SystemError } from "@/com/errors";
import { ReturnedAllUserInfo } from "@/com/types";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const getAllUserInfo = async (): Promise<ReturnedAllUserInfo> => {
  const token = await data.getToken();

  const apiUrl = getApiUrl();

  return fetch(`${apiUrl}/users/self`, {
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
          .then((body) => body);

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
