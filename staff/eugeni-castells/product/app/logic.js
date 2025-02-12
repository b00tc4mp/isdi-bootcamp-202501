var logic = {
  constant: {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMAIL_REGEX:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  validate: {
    string: function (string, explain) {
      if (typeof string !== "string")
        throw new TypeError("invalid " + explain + " type");
    },
    text: function (text, explain) {
      this.string(text, explain);
      if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text))
        throw new SyntaxError("invalid " + explain + " syntax");
    },
    email: function (email, explain) {
      this.string(email, explain);
      if (!logic.constant.EMAIL_REGEX.test(email))
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
  },
  registerUser: function (userInfo) {
    this.validate.text(userInfo.name, "name");
    this.validate.minLength(userInfo.name, 1, "name");
    this.validate.maxLength(userInfo.name, 20, "name");
    this.validate.email(userInfo.email, "email");
    this.validate.username(userInfo.username, "username");
    this.validate.password(userInfo.password, "password");

    var userFound;

    for (var i = 0; i < data.users.length && !userFound; i++) {
      if (
        userInfo.username === data.users[i].username ||
        userInfo.email === data.users[i].email
      ) {
        userFound = userInfo;
      }
    }

    if (userFound) throw new Error("user already exists");

    var user = {
      id: data.uuid(),
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password,
      createdAt: new Date(),
      modifiedAt: null,
    };

    data.users[data.users.length] = user;

    localStorage.setItem("users", JSON.stringify(data.users));
  },
  loginUser: function (username, password) {
    this.validate.username(username, "username");
    this.validate.password(password, "password");

    var found;

    for (var i = 0; i < data.users.length && !found; i++) {
      var user = data.users[i];

      if (user.username === username) found = user;
    }

    if (!found || user.password !== password)
      throw new Error("wrong credentials");

    data.userId = found.id;
  },
  setOfflineUser: function () {
    data.userId = null;
  },
};
