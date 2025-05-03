import errors, { SystemError } from "@/com/errors";
import { ReturnedAllUserInfo } from "@/com/types";
import { data } from "@/data";

export const getAllUserInfo = async (): Promise<ReturnedAllUserInfo> => {
  const token = await data.getToken();
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
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
