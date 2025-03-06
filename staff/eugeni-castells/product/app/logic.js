import data from "./data.js";

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
    id(id, explain) {
      this.text(id, explain);
      if (id.length < 10 || id.length > 14)
        throw new RangeError(`invalid ${explain} length`);
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

    const userFound = data.users.findOne(
      (user) =>
        user.username === userInfo.username || user.email === userInfo.email
    );

    if (userFound) throw new Error("user already exists");

    const user = {
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password,
      createdAt: new Date(),
      modifiedAt: null,
    };

    data.users.insertOne(user);
  },
  loginUser: function (username, password) {
    this.validate.username(username, "username");
    this.validate.password(password, "password");

    let found = data.users.findOne((user) => user.username === username);

    if (!found || found.password !== password)
      throw new Error("wrong credentials");

    data.userId = found.id;
  },
  logoutUser: function () {
    data.userId = null;
  },
  isUserConnected() {
    return !!data.userId;
  },
  getPosts: function () {
    const aggregatedPosts = [];

    const { userId } = data;

    const posts = data.posts.getAll();

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];

      let liked = false;

      for (let i = 0; i < post.likes.length && !liked; i++) {
        if (post.likes[i] === userId) {
          liked = true;
        }
      }
      const { id, author, image, text, createdAt, modifiedAt, likes } = post;

      const user = data.users.getById(author);

      const username = user.username;

      let aggregatedPost = {
        id: id,
        author: { author: author, username: username },
        image: image,
        text: text,
        createdAt: createdAt && new Date(createdAt),
        modifiedAt: modifiedAt && new Date(modifiedAt),
        likes: likes,
        liked: liked,
        own: post.author === userId,
      };

      aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
    }

    return aggregatedPosts;
  },
  addPost: function (post) {
    const { image, text } = post;

    this.validate.text(image, "image URL");
    this.validate.minLength(image, 10, "image URL");
    this.validate.text(text, "text");

    const newPost = {
      author: data.userId,
      image: image,
      text: text,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };

    data.posts.insertOne(newPost);
  },
  getOnlineUserInfo() {
    let found;

    found = data.users.getById(data.userId);

    if (!found) throw new Error("User not found");
    else return found;
  },
  getOnlineUserName() {
    const user = this.getOnlineUserInfo();

    return user.name;
  },
  updatePostLikes(postId) {
    const postFound = data.posts.getById(postId);

    if (!postFound) throw new Error("Post not found");

    let userIdFound;

    for (let i = 0; i < postFound.likes.length; i++) {
      if (data.userId === postFound.likes[i]) userIdFound = data.userId;
    }

    if (!userIdFound) {
      postFound.likes[postFound.likes.length] = data.userId;
    } else {
      let likes = [];

      for (let i = 0; i < postFound.likes.length; i++) {
        if (postFound.likes[i] !== data.userId)
          likes[likes.length] = postFound.likes[i];
      }
      postFound.likes = likes;
    }
    data.posts.updateOne(postFound);
  },
  deletePost(postId) {
    this.validate.id(postId, "id");

    const { userId } = data;

    const foundPost = data.posts.findOne((post) => post.id === postId);

    if (!foundPost) throw new NotFoundError("post not found");

    if (foundPost.author !== userId)
      throw new OwnershipError("user is not author of post");

    data.posts.deleteOne((post) => post.id === postId);
  },
  updatePostText(postId, text) {
    this.validate.id(postId, "post id");

    const post = data.posts.getById(postId);

    post.text = text;

    data.posts.updateOne(post);
  },
};

export default logic;
