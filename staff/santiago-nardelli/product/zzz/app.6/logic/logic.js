import data from "../data/data.js";
import DuplicityError from "../errors/DuplicityError.js";
import CredentialsError from "../errors/CredentialsError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { OwnershipError } from "../errors/errors.js";

const logic = {
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
    id(id, explain) {
      this.text(id, explain);
      if (id.length !== 20) throw new RangeError(`Invalid ${explain} ${id}`);
    },
  },

  // funcion para registrar un usuario con su validasion
  registerUser(name, email, password) {
    this.validate.text(name, "name");
    this.validate.maxLength(name, 20, "name");
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    //meotodo de data para buscar un usuario
    const found = data.users.findOne(
      (user) => user.email === email || user.name === name
    );

    if (found) throw new DuplicityError("user already exists");

    const user = {
      name: name,
      email: email,
      password: password,
      createdAt: new Date(),
      status: "active",
      role: "user",
      modifiedAt: null,
    };
    //metodo de data para insertar un usuario
    data.users.insertOne(user);
  },

  // funcion para loguear un usuario con su validasion
  loginUser(email, password) {
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    //metodo de data para buscar un usuario ya logueado
    const found = data.users.findOne((user) => user.email === email);

    if (!found || found.password !== password)
      throw new CredentialsError("invalid credentials");

    data.userId = found.id;
  },

  // funcion para desloguear un usuario
  logoutUser() {
    data.userId = null;
  },

  //funcion para reconocer el user de la sesion
  getUserName() {
    const users = data.users.getAll();

    const { userId } = data;

    const found = data.users.getById(userId);

    if (!found) throw new NotFoundError("user not found");

    return found.name;
  },

  //funcion para saber si el user esta logueado la doble !! convierte el valor en booleano
  isUserLoggedIn() {
    return !!data.userId;
  },
  //funcion para traer todos los posts
  getPosts() {
    const posts = data.posts.getAll();

    const { userId } = data;

    const aggregatedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      let liked = false;

      for (let i = 0; i < post.likes.length && !liked; i++) {
        const id = post.likes[i];

        if (id === userId) liked = true;
      }

      const user = data.users.getById(post.author);

      const aggregatedPost = {
        id: post.id,
        author: { id: post.author, name: user.name },
        image: post.image,
        title: post.title,
        createdAt: new Date(post.createdAt),
        modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
        liked: liked,
        likesCount: post.likes.length,
        own: post.author === userId,
      };

      aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
    }

    return aggregatedPosts.reverse();
  },

  // funcion para crear un post con su validasion
  createPost(image, title) {
    //valido que la imagen y el titulo sean de tipo string
    this.validate.text(image, "image");
    this.validate.maxLength(1000);
    this.validate.text(title, "title");
    this.validate.maxLength(500);

    const { userId } = data;
    //creo un objeto post con los datos que recibo
    const post = {
      author: userId,
      image: image,
      title: title,
      userId: userId,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };

    data.posts.insertOne(post);
  },

  //Funcion para los likes de los POSTS--> recibe como parametro el id del post para trabajar sobre el mismo
  toggleLikePost(postId) {
    this.validate.id(postId, "postId");
    // me traigo el user id de la data
    const { userId } = data;

    // me traigo los posts de la data para trabajar sobre ellos
    let foundPost = data.posts.findOne((post) => post.id === postId);

    // si no encuentra el post tira un error
    if (!foundPost) throw new NotFoundError("post not found");

    // declaro una variable booleana para saber si el user ya le dio like al post y la inicializo en false
    let userIdFound = false;
    //recorro el array de likes del post
    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
      const id = foundPost.likes[i];

      if (id === userId) userIdFound = true;
    }
    // Si el usuario no ha dado like, se añade su id al array de likes
    if (!userIdFound) foundPost.likes[foundPost.likes.length] = userId;
    else {
      // Si el usuario ya ha dado like, se elimina su id del array de likes
      //Si userIdFound es true, se crea un nuevo array likes y se recorre el array de likes del post. Se añaden todos los id al nuevo array excepto el userId del usuario actual. Luego, se actualiza el array de likes del post con el nuevo array likes.
      const likes = [];

      for (let i = 0; i < foundPost.likes.length; i++) {
        const id = foundPost.likes[i];

        if (id !== userId) likes[likes.length] = id;
      }

      foundPost.likes = likes;
    }
    // Actualizo el post en la data

    data.posts.updateOne(foundPost);
  },
  deletePost(postId) {
   // this.validate.id(postId, "postId");

    const { userId } = data;

    const foundPost = data.posts.findOne((post) => post.id === postId);

    if (!foundPost) throw new NotFoundError("post not found");

    if (foundPost.author !== userId)
      throw new OwnershipError("user is not author of post");

    data.posts.deleteOne((post) => post.id === postId);
  },

  modifyPost(postId, image, title) {
    // Validar el ID del post
    // this.validate.id(postId, "postId");

    // Validar la imagen y el título
    this.validate.text(image, "image");
    this.validate.maxLength(image, 1000, "image");
    this.validate.text(title, "title");
    this.validate.maxLength(title, 500, "title");

    // Obtener el ID del usuario actual
    const { userId } = data;

    // Buscar el post en la data
    const foundPost = data.posts.findOne((post) => post.id === postId);

    // Si no se encuentra el post, lanzar un error
    if (!foundPost) throw new NotFoundError("post not found");

    // Si el autor del post no es el usuario actual, lanzar un error
    if (foundPost.author !== userId) throw new OwnershipError("user is not author of post");

    // Actualizar el post con los nuevos datos
    foundPost.image = image;
    foundPost.title = title;
    foundPost.modifiedAt = new Date();

    // Actualizar el post en la data
    data.posts.updateOne(foundPost);
  },
};

export default logic;


