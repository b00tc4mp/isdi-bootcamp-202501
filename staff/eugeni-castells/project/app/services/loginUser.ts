import { validate, errors } from "@/com";
const { SystemError } = errors;
import { data } from "@/data";

export const loginUser = (email: string, password: string): Promise<void> => {
  validate.email(email);
  validate.password(password);

  return fetch(`${process.env.EXPO_PUBLIC_API_URL_ALXII}/users/auth`, {
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
