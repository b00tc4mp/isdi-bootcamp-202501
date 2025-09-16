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
    let found;
    // recorro el array de usuarios para buscar si el usuario ya existe
    for (i = 0; i < data.users.length && !found; i++) {
      // guardo el usuario en una variable para compararlo con el usuario que se quiere registrar
      const user = data.users[i];

      // si el usuario ya existe lo guardo en la variable found
      if (user.name === name || user.email === email) found = user;
    }

    if (found) throw new DuplicityError("user already exists");

    const user = {
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
  },

  // funcion para loguear un usuario con su validasion
  loginUser: function (email, password) {
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    let found;

    for (i = 0; i < data.users.length && !found; i++) {
      const user = data.users[i];

      if (user.email === email) found = user;
    }

    if (!found || found.password !== password)
      throw new CredentialsError("invalid credentials");

    data.userId = found.id;
  },

  // funcion para desloguear un usuario
  logoutUser: function () {
    data.userId = null;
  },

  //funcion para reconocer el user de la sesion
  getUserName: function () {
    let found;

    for (let i = 0; i < data.users.length && !found; i++) {
      const user = data.users[i];

      if (user.id === data.userId) found = user;
    }

    if (!found) throw new Error("user not found");

    return found.name;
  },

  //funcion para traer todos los posts
  getPosts: function () {

    // creo un array vacio para guardar los posts
    const aggregatedPosts = [];


    // recorro el array de posts
    for (let i = 0; i < data.posts.length; i++) {
      
      const post = data.posts[i];

      let liked = false;

      for (let i = 0; i < post.likes.length && !liked; i++) {
        const userId = post.likes[i];

        if (userId === data.userId) liked = true;
      }

      const aggregatedPost = {
        id: post.id,
        author: post.author,
        image: post.image,
        text: post.text,
        createdAt: post.createdAt,
        modifiedAt: post.modifiedAt,
        liked: liked,
        likesCount: post.likes.length,
      };

      aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
    }

    return aggregatedPosts.reverse();
  },

  // funcion para crear un post con su validasion
  createPost: function (image, title) {
    //valido que la imagen y el titulo sean de tipo string
    this.validate.text(image, "image");
    this.validate.maxLength(1000);
    this.validate.text(title, "title");
    this.validate.maxLength(500);

    //creo un objeto post con los datos que recibo
    const post = {
      id: data.uuid(),
      image: image,
      title: title,
      userId: data.userId,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };
    // guardo el post en el array de posts y lo agrego al final
    data.posts[data.posts.length] = post;
  },

  //Funcion para los likes de los POSTS--> recibe como parametro el id del post para trabajar sobre el mismo
  toggleLikePost(postId) {
    //declaro variable vacia de found, que el caso del postId que recibo por parametros sea igual a algun ID de mi array de ID`s la igualo a ese ID en consecuente a ese POST
    let foundPost;

    /*
    recorro mi array de posts para ver si existe y lo encuentro--> tengo dos parametros en mi for de condiciones
    la longitud de mi array y la variable declarada anteriormente negada--> si es que no reasigno el valor dentro de mi for 
    */
    for (let i = 0; i < data.posts.length && !foundPost; i++) {
      //manejo cada posicion de mi array de posts como un unico elemento POST--> esto mediante la iteracion del for y el incremnto de la posicion [I]
      const post = data.posts[i];
      //Condicinale de encuentro de busqueda--> Si el post unitario.id es exactamente igual a el valor que le paso por parametro a la funcion que se origina desde mi componente al hacerle click al Like button--> reasigno el valor de la variable foundPost a la del POST unitario
      if (post.id === postId) foundPost = post;
    }
    //Si la variable no muta de su valor original-->underfine lanzamos error , seria que no engtra en el caso anterior
    if (!foundPost) throw new NotFoundError("post not found");
    /*Esta parte corresponde al primer nodo del diagrama ("¿Existe el Post?"). Si el post no existe, lanza un error.
     */

    //declaro una nueva variable de ayuda booleana
    let userIdFound = false;
    /*
      Itero sobre el post ENCONTADO(por su ID), y utilizo la variable booleana como condicinal tambien 
      Aqui lo que trabajo es el array de likes y los id de usuarios dentro de ese array[usuarios que han dado like a un post ]-->me sirve para poder agregar un like solamente por user y permitir es des-like 
      
  
     Esta sección corresponde al nodo "¿Ya dio Like?" del diagrama. Aquí es donde el usuario se pierde en la explicación. La variable userIdFound actúa como un indicador booleano que determinará qué acción tomar después.
     */
    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
      //Trabajo dentro del post encontrado--> dentro de el array de likes dentro de el
      //BUSCO LOS ID y lo declaro en una nueva variable
      const userId = foundPost.likes[i];

      //Condicinal de encuentro del ID dentro del array de LIKES
      if (userId === data.userId) userIdFound = true;
    }

    // Si userIdFound es false: agrega el ID del usuario al final del array de likes
    //Si userIdFound es true: crea un nuevo array sin el ID del usuario actual

    /*
      Aquí está la clave para entenderlo:


      Cuando userIdFound es false significa que el usuario NO ha dado like antes

      El signo ! niega esta condición

      Por lo tanto, !userIdFound será true cuando el usuario NO ha dado like

      Y será false cuando el usuario YA ha dado like

      Esta lógica booleana es la que determina si agregamos o removemos el like del post. Es como un interruptor que cambia entre dos estados: dar like y quitar like.
      */
    if (!userIdFound) foundPost.likes[foundPost.likes.length] = data.userId;
    else {
      const likes = [];

      for (let i = 0; i < foundPost.likes.length; i++) {
        const userId = foundPost.likes[i];

        if (userId !== data.userId) likes[likes.length] = userId;
      }

      foundPost.likes = likes;
    }
  },
};
