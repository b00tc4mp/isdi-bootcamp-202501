import "dotenv/config";
import getEnv from "@/data/constants";
import { errors, validate } from "../com";

const { SystemError } = errors;

const registerUser = (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  validate.username(username, "username");
  validate.email(email, "email");
  validate.password(password, "password");

  const { apiUrl } = getEnv();

  return fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 201) return; // HAPPY PATH

      return response
        .json()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((body) => {
          const { error, message } = body;
          const constructor =
            errors[error as keyof typeof errors] || SystemError;

          throw new constructor(message);
        });
    });
};

export default registerUser;
