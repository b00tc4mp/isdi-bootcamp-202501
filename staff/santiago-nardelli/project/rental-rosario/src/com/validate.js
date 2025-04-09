import { constant } from "./constants.js"
import { ValidateError } from "./errors/error.js";

export const validate = {
  string(string, explain ='string') {
    if (typeof string !== "string")
      throw new ValidateError(`Invalid ${explain} ${string}`);
  },

  text(text, explain='text') {
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
  name(value, explain='name') {
    this.text(value, explain)
    if(!constant.NAME_REGEX.test(value)) throw new ValidateError(`Invalid ${explain} ${value}`)

  },
  username(username, explain='username') {
    this.text(username, explain), this.minLength(username, 3, explain);
    this.maxLength(username, 20, explain);
  },
  password(password, explain='password') {
    this.text(password, explain), this.minLength(password, 5, explain);
    this.maxLength(password, 20, explain);
  },
  email(email, explain='email') {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new ValidateError(`Invalid ${explain} ${email}`);
    this.maxLength(email, 30, explain);
  },
  url(url, explain='url') {
    this.string(url, explain);
    if (!constant.URL_REGEX.test(url))
      throw new ValidateError(`Invalid ${explain} ${url}`);
  },

  id(id, explain='id') {
    this.text(id, explain);
    if (id.length > 25) throw new ValidateError(`Invalid ${explain} ${id}`);
  },
};