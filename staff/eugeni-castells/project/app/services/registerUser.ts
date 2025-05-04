import { validate } from "@/com";
import { RegisterUserInputType } from "./types";
import { errors } from "@/com";

const { SystemError } = errors;

const { EXPO_PUBLIC_API_URL } = process.env;

export const registerUser = (userInfo: RegisterUserInputType) => {
  debugger;
  const { name, email, password, address, city, country, coordinates } =
    userInfo;

  validate.email(email);
  validate.password(password);
  validate.text(name, "name");
  validate.text(address, "address");
  validate.text(city.name, "city");
  validate.text(country.name, "country");

  return fetch(`${EXPO_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  })
    .catch((error) => {
      console.error(error);

      throw new SystemError(error.message);
    })
    .then((response) => {
      if (response.status === 201) return;

      return response
        .json()
        .catch((error) => {
          console.error(error);

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
