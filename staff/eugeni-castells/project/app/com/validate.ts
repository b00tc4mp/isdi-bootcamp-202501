import constant from "./constants";
import { ValidationError } from "./errors";
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
  email: function (email: string): void {
    this.string(email, "email");
    if (!constant.EMAIL_REGEX.test(email))
      throw new ValidationError("invalid " + "email" + " syntax");
  },
  username: function (username: string): void {
    this.text(username, "username");
    this.minLength(username, 3, "username");
    this.maxLength(username, 20, "username");
  },
  password: function (password: string) {
    this.text(password, "password");
    this.minLength(password, 8, "password");
    this.maxLength(password, 50, "password");
  },
  hashedPassword: function (password: string, explain: string) {
    this.text(password, explain);
    this.minLength(password, 50, explain);
    this.maxLength(password, 100, explain);
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
  url(url: string): void {
    this.string(url, "url");
    if (!constant.URL_REGEX.test(url))
      throw new ValidationError(`invalid url syntax`);
  },
  id(id: string, explain: string): void {
    this.text(id, "id" + explain);

    if (!constant.OBJECT_ID_REGEX.test(id))
      throw new ValidationError(`invalid id as ObjectId syntax`);

    if (id.length !== 24) throw new ValidationError(`invalid id length`);
  },
  date(date: Date): void {
    if (!(date instanceof Date))
      throw new ValidationError("invalid date syntax");
  },
};
