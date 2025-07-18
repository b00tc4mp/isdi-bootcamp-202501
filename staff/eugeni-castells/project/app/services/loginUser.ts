import { validate, errors } from "@/com";
const { SystemError } = errors;
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const loginUser = (email: string, password: string): Promise<void> => {
  validate.email(email);
  validate.password(password);

  const url = getApiUrl();

  return fetch(`${url}/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .catch((error) => {
      console.error(error);

      const err = error as Error;

      throw new SystemError(err.message);
    })
    .then((response) => {
      console.log(response.status);

      if (response.status === 200)
        return response
          .json()
          .catch((error) => {
            console.error(error);

            throw new SystemError(error.message);
          })
          .then((body) => {
            const { token } = body;

            data.setSeenLanding();

            return data.setToken(token);
          });
      return response
        .json()
        .catch((error) => {
          console.error(error);

          throw new SystemError(error.message);
        })
        .then((body) => {
          const { error, message } = body;

          const constructor = errors[error as keyof typeof errors];

          throw new constructor(message);
        });
    });
};
