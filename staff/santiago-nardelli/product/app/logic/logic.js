var logic = {
  constant: {
    // regex para validar si un string esta vacio o tiene solo espacios en blanco
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    // regex para validar un email
    EMAIL_REGEX:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    URL_REGEX:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  },

  validate: {
    // validasion de string type
    string: function (string, explain) {
      if (typeof string !== "string")
        throw new TypeError(`Invalid ${explain} ${string}`);
    },
    //validasion de text type
    text: function (text, explain) {
      this.string(text, explain);
      // si el texto esta vacio o tiene solo espacios en blanco
      if (logic.constant.EMPTY_OR_BLANK_REGEX.test(text))
        throw new SyntaxError(`Invalid ${explain} ${text}`);
    },
    // validasion de maxLenght
    maxLength: function (value, maxLength, explain) {
      if (value.length > maxLength)
        throw new RangeError(`invalid ${explain} ${maxLength}`);
    },
    // validasion de minLenght
    minLength: function (value, minLength, explain) {
      if (value.lenght > minLength)
        throw new RangeError(`invalid ${explain} ${minLength}`);
    },
    // validasion de username type
    username: function (username, explain) {
      this.text(username, explain), this.minLength(username, 3, explain);
      this.maxLength(username, 20, explain);
    },
    // validasion de password type
    password: function (password, explain) {
      this.text(password, explain), this.minLength(password, 5, explain);
      this.maxLength(password, 20, explain);
    },

    // validasion de email type
    email: function (email, explain) {
      //validasion de string type
      this.string(email, explain);
      // si el email no cumple con el regex
      if (!logic.constant.EMAIL_REGEX.test(email))
        throw new SyntaxError(`Invalid ${explain} ${email}`);
      this.maxLength(email, 30, explain);
    },

    // validasion de url type
    url: function (url, explain) {
      this.string(url, explain);
      if (!logic.constant.URL_REGEX.test(url))
        throw new SyntaxError(`Invalid ${explain} ${url}`);
    },
  },
  // funcion para registrar un usuario con su validasion
  registerUser: function (name, email, password) {
    this.validate.text(name, "name");
    this.validate.maxLength(name, 20, "name");
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    //declaro una variable para guardar el usuario encontrado, la inicializo null, para que si no se encuentra el usuario, no se guarde nada
    var found;
    // recorro el array de usuarios para buscar si el usuario ya existe
    for (i = 0; i < data.users.length && !found; i++) {
      // guardo el usuario en una variable para compararlo con el usuario que se quiere registrar
      var user = data.users[i];

      // si el usuario ya existe lo guardo en la variable found
      if (user.name === name || user.email === email) found = user;

      if (found) throw new Error("user already exists");

      var user = {
        id: data.uuid(),
        name: name,
        email: email,
        // username: username,
        password: password,
        createdAt: new Date(),
        status: "active",
        role: "user",
        modifiedAt: null,
      };

      data.users[data.users.length] = user;
    }
  },
  // funcion para loguear un usuario con su validasion
  loginUser: function (email, password) {
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    var found;

    for (i = 0; i < data.users.length && !found; i++) {
      var user = data.users[i];

      if (user.email === email) found = user;
    }

    if (!found || found.password !== password)
      throw new Error("invalid credentials");

    data.userId = found.id;
  },

  logout: function () {
    data.userId = null;
  },

  getUserName: function () {
    var found;

    for (let i = 0; i < data.users.length && !found; i++) {
      var user = data.users[i];

      if (user.id === data.userId) found = user;
    }

    if (!found) throw new Error("user not found");

    return found.name;
  },

  getPosts: function () {
    return data.posts;
  },

  createPost: function (image, title) {
    //valido que la imagen y el titulo sean de tipo string
    this.validate.text(image, "image");
    this.validate.maxLength(1000);
    this.validate.text(title, "title");
    this.validate.maxLength(500);

    //creo un objeto post con los datos que recibo
    var post = {
      id: data.uuid(),
      image: image,
      title: title,
      userId: data.userId,
      createdAt: new Date(),
      modifiedAt: null,
      likes : []
    };
    // guardo el post en el array de posts y lo agrego al final
    data.posts[data.posts.length] = post;
  },
};
