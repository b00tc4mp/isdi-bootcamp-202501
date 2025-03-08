import constant from "./constants";

export const validate = {
  string: function (string, explain) {
    if (typeof string !== "string")
      throw new TypeError("invalid " + explain + " type");
  },
  text: function (text, explain) {
    this.string(text, explain);
    if (constant.EMPTY_OR_BLANK_REGEX.test(text))
      throw new SyntaxError("invalid " + explain + " syntax");
  },
  email: function (email, explain) {
    this.string(email, explain);
    if (!constant.EMAIL_REGEX.test(email))
      throw new SyntaxError("invalid " + explain + " syntax");
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
      throw new RangeError("invalid " + explain + " range error");
  },
  minLength: function (value, minLength, explain) {
    if (value.length < minLength)
      throw new RangeError("invalid " + explain + " range error");
  },
  id(id, explain) {
    this.text(id, explain);
    if (id.length < 10 || id.length > 14)
      throw new RangeError(`invalid ${explain} length`);
  },
};
