const logic = {
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
    const { validate } = this;

    validate.text(userInfo.name, "name");
    validate.minLength(userInfo.name, 1, "name");
    validate.maxLength(userInfo.name, 20, "name");
    validate.email(userInfo.email, "email");
    validate.username(userInfo.username, "username");
    validate.password(userInfo.password, "password");

    let userFound;

    const { users } = data;

    for (let i = 0; i < users.length && !userFound; i++) {
      if (
        userInfo.username === users[i].username ||
        userInfo.email === users[i].email
      ) {
        userFound = userInfo;
      }
    }

    if (userFound) throw new Error("user already exists");

    const user = {
      id: data.uuid(),
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password,
      createdAt: new Date(),
      modifiedAt: null,
    };

    // data.users[data.users.length] = user;
    // Can't write a getter and a setter in the same line.
    // data.users = users;

    users[users.length] = user;

    data.users = users;
  },
  loginUser: function (username, password) {
    this.validate.username(username, "username");
    this.validate.password(password, "password");

    let found;

    const { users } = data;

    for (let i = 0; i < users.length && !found; i++) {
      const user = users[i];

      if (user.username === username) found = user;
    }

    if (!found || found.password !== password)
      throw new Error("wrong credentials");

    data.userId = found.id;
  },
  setOfflineUser: function () {
    data.userId = null;
  },
  isUserConnected() {
    return !!data.userId;
  },
  getPosts: function () {
    const aggregatedPosts = [];

    const { posts, userId } = data;

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];

      let liked = false;

      for (let i = 0; i < post.likes.length && !liked; i++) {
        if (post.likes[i] === userId) {
          liked = true;
        }
      }
      const { id, author, image, text, createdAt, modifiedAt, likes } = post;

      let aggregatedPost = {
        id: id,
        author: author,
        image: image,
        text: text,
        createdAt: createdAt,
        modifiedAt: modifiedAt,
        likes: likes,
        liked: liked,
      };

      aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
    }

    return aggregatedPosts;
  },
  addPost: function (post) {
    const { image, name, year, location, bio } = post;

    this.validate.text(image, "image URL");
    this.validate.minLength(image, 10, "image URL");
    this.validate.text(bio, "bio");
    this.validate.text(name, "name");
    this.validate.text(year, "year");
    this.validate.text(location, "location");
    this.validate.text(bio, "bio");

    const newPost = {
      id: data.uuid(),
      author: data.userId,
      name: name,
      year: year,
      location: location,
      image: image,
      text: bio,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };

    const { posts } = data;

    posts[posts.length] = newPost;

    data.posts = posts;
  },
  getOnlineUserInfo() {
    let found;

    const { users, userId } = data;

    for (let i = 0; i < users.length && !found; i++) {
      const user = users[i];

      if (user.id === userId) {
        found = user;
      }
    }

    if (!found) throw new Error("User not found");
    else return found;
  },
  getOnlineUserName() {
    const user = this.getOnlineUserInfo();
    return user.name;
  },
  updatePostLikes(postId) {
    var postFound = false;

    const { posts, userId } = data;

    for (let i = 0; i < posts.length && !postFound; i++) {
      const post = posts[i];

      if (post.id === postId) {
        postFound = post;

        postFoundIndex = i;
      }
    }

    if (!postFound) throw new Error("Post not found");

    let userIdFound;

    for (let i = 0; i < postFound.likes.length; i++) {
      if (userId === postFound.likes[i]) userIdFound = userId;
    }

    if (!userIdFound) {
      postFound.likes[postFound.likes.length] = userId;

      data.posts = posts;
    } else {
      let likes = [];
      for (let i = 0; i < postFound.likes.length; i++) {
        if (postFound.likes[i] !== userId)
          likes[likes.length] = postFound.likes[i];
      }
      postFound.likes = likes;
      data.posts = posts;
    }
  },
};
