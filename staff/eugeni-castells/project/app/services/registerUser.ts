import { validate } from "@/com";
import { RegisterUserInputType } from "./types";
import { errors } from "@/com";

const { SystemError } = errors;

const { EXPO_PUBLIC_API_URL } = process.env;
/*const watchID = navigator.geolocation.watchPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
});
The watchPosition() method returns an ID number that can be used to uniquely identify the requested position watcher; you use this value in tandem with the clearWatch() method to stop watching the user's location.

js
Copy to Clipboard
navigator.geolocation.clearWatch(watchID);*/
export const registerUser = (userInfo: RegisterUserInputType) => {
  const { name, email, password, address, city, country } = userInfo;

  validate.email(email);
  validate.password(password);
  validate.text(name, "name");
  validate.text(address, "address");
  validate.text(city, "city");
  validate.text(country, "country");

  return fetch(`http://localhost:8080/users`, {
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
        });
    });
};
