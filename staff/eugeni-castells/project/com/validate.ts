import constant from "./constants.js";
import { ValidationError } from "./errors.ts";

export const validate = {
  string: function (string: string, explain: string): void {
    if (typeof string !== "string")
      throw new ValidationError("invalid " + explain + " type");
  },
  text: function (text: string, explain: string): void {
    this.string(text, explain);
    if (constant.EMPTY_OR_BLANK_REGEX.test(text))
      throw new ValidationError("invalid " + explain + " syntax");
  },
  email: function (email: string, explain: string): void {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new ValidationError("invalid " + explain + " syntax");
  },
  username: function (username: string, explain: string): void {
    this.text(username, explain);
    this.minLength(username, 3, explain);
    this.maxLength(username, 20, explain);
  },
  password: function (password: string, explain: string) {
    this.text(password, explain);
    this.minLength(password, 8, explain);
    this.maxLength(password, 20, explain);
  },
  maxLength: function (
    value: string,
    maxLength: number,
    explain: string
  ): void {
    if (value.length > maxLength)
      throw new ValidationError("invalid " + explain + " range error");
  },
  minLength: function (
    value: string,
    minLength: number,
    explain: string
  ): void {
    if (value.length < minLength)
      throw new ValidationError("invalid " + explain + " range error");
  },
  url(url: string, explain: string): void {
    this.string(url, explain);
    if (!constant.URL_REGEX.test(url))
      throw new ValidationError(`invalid ${explain} syntax`);
  },
  id(id: string, explain: string): void {
    this.text(id, explain);

    if (!constant.OBJECT_ID_REGEX.test(id))
      throw new ValidationError(`invalid ${explain} as ObjectId syntax`);

    if (id.length !== 24)
      throw new ValidationError(`invalid ${explain} length`);
  },
};
