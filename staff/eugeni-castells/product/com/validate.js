import constant from "./constants.js";

export const validate = {
  string: function (string, explain) {
    if (typeof string !== "string")
      throw new Error("invalid " + explain + " type");
  },
  text: function (text, explain) {
    this.string(text, explain);
    if (constant.EMPTY_OR_BLANK_REGEX.test(text))
      throw new Error("invalid " + explain + " syntax");
  },
  email: function (email, explain) {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new Error("invalid " + explain + " syntax");
  },
  username: function (username, explain) {
    this.text(username, explain);
    this.minLength(username, 3, explain);
    this.maxLength(username, 20, explain);
  },
  password: function (password, explain) {
    this.text(password, explain);
    this.minLength(password, 8, explain);
    this.maxLength(password, 20, explain);
  },
  maxLength: function (value, maxLength, explain) {
    if (value.length > maxLength)
      throw new Error("invalid " + explain + " range error");
  },
  minLength: function (value, minLength, explain) {
    if (value.length < minLength)
      throw new Error("invalid " + explain + " range error");
  },
  url(url, explain) {
    this.string(url, explain);
    if (!constant.URL_REGEX.test(url))
      throw new Error(`invalid ${explain} syntax`);
  },
  id(id, explain) {
    this.text(id, explain);

    if (!constant.OBJECT_ID_REGEX.test(id))
      throw new Error(`invalid ${explain} as ObjectId syntax`);

    if (id.length !== 24) throw new Error(`invalid ${explain} length`);
  },
};
