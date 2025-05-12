import { validate } from "@/com";
import { RegisterUserInputType } from "./types";
import { errors } from "@/com";
import { getApiUrl } from "@/getApiUrl";

const { SystemError } = errors;

export const registerUser = (userInfo: RegisterUserInputType) => {
  const { name, email, password, address, city, country } = userInfo;

  validate.email(email);
  validate.password(password);
  validate.text(name, "name");
  validate.text(address, "address");
  if (city && country) {
    validate.text(city, "city");
    validate.text(country, "country");
  }

  const apiUrl = getApiUrl();

  return fetch(`${apiUrl}/users`, {
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
