import { constant } from "./constants.js";
import { ValidateError } from "./errors/error.js";

export const validate = {
  string(string, explain = "string") {
    if (typeof string !== "string")
      throw new ValidateError(`Invalid ${explain} ${string}`);
  },
  number(number, explain = "number") {
    if (typeof number !== "number")
      throw new ValidateError(`Invalid ${explain} ${number}`);
  },

  text(text, explain = "text") {
    this.string(text, explain);
    if (constant.EMPTY_OR_BLANK_REGEX.test(text))
      throw new ValidateError(`Invalid ${explain} ${text}`);
  },
  maxLength(value, maxLength, explain) {
    if (value.length > maxLength)
      throw new ValidateError(`invalid ${explain} ${maxLength}`);
  },
  minLength(value, minLength, explain) {
    if (value.lenght > minLength)
      throw new ValidateError(`invalid ${explain} ${minLength}`);
  },
  name(value, explain = "name") {
    this.text(value, explain);
    if (!constant.NAME_REGEX.test(value))
      throw new ValidateError(`Invalid ${explain} ${value}`);
  },
  username(username, explain = "username") {
    this.text(username, explain), this.minLength(username, 3, explain);
    this.maxLength(username, 20, explain);
  },
  password(password, explain = "password") {
    this.text(password, explain), this.minLength(password, 5, explain);
    this.maxLength(password, 20, explain);
  },
  email(email, explain = "email") {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new ValidateError(`Invalid ${explain} ${email}`);
    this.maxLength(email, 30, explain);
  },
  url(value, fieldName) {
    if (Array.isArray(value)) {
      value.forEach((url) => {
        if (
          typeof url !== "string" ||
          !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(url)
        ) {
          throw new Error(`Invalid URL in ${fieldName}: ${url}`);
        }
      });
    } else if (
      typeof value !== "string" ||
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)
    ) {
      throw new Error(`Invalid URL in ${fieldName}: ${value}`);
    }
  },

  id(id, explain = "id") {
    this.text(id, explain);
    if (id.length > 25) throw new ValidateError(`Invalid ${explain} ${id}`);
  },
};
