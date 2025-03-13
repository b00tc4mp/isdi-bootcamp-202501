import { constant } from "./constants.js";
import { ValidateError } from '../errors/errors.js';

export const validate = {
  string(string, explain) {
    if (typeof string !== "string")
      throw new TypeError(`Invalid ${explain} ${string}`);
  },

  text(text, explain) {
    this.string(text, explain);
    // si el texto esta vacio o tiene solo espacios en blanco
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
  username(username, explain) {
    this.text(username, explain),
    this.minLength(username, 3, explain);
    this.maxLength(username, 20, explain);
  },
  password(password, explain) {
    this.text(password, explain), 
    this.minLength(password, 5, explain);
    this.maxLength(password, 20, explain);
  },
  email(email, explain) {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new ValidateError(`Invalid ${explain} ${email}`);
    this.maxLength(email, 30, explain);
  },
  url(url, explain) {
    this.string(url, explain);
    if (!constant.URL_REGEX.test(url))
      throw new ValidateError(`Invalid ${explain} ${url}`);
  },

  //TODO check if this is the correct way to validate an id
  id(id, explain) {
    this.text(id, explain);
    if (id.length > 20) throw new ValidateError(`Invalid ${explain} ${id}`);
  },
};
