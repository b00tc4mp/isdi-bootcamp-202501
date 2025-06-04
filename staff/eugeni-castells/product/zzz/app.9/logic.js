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
    this.validate.text(userInfo.name, "name");
    this.validate.minLength(userInfo.name, 1, "name");
    this.validate.maxLength(userInfo.name, 20, "name");
    this.validate.email(userInfo.email, "email");
    this.validate.username(userInfo.username, "username");
    this.validate.password(userInfo.password, "password");

    let userFound;

    for (let i = 0; i < data.users.length && !userFound; i++) {
      if (
        userInfo.username === data.users[i].username ||
        userInfo.email === data.users[i].email
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

    data.users[data.users.length] = user;

    localStorage.setItem("users", JSON.stringify(data.users));
  },
  loginUser: function (username, password) {
    this.validate.username(username, "username");
    this.validate.password(password, "password");

    let found;

    for (let i = 0; i < data.users.length && !found; i++) {
      const user = data.users[i];

      if (user.username === username) found = user;
    }

    if (!found || found.password !== password)
      throw new Error("wrong credentials");

    data.userId = found.id;
  },
  setOfflineUser: function () {
    data.userId = null;
  },
  getPosts: function () {
    const aggregatedPosts = [];

    for (let i = 0; i < data.posts.length; i++) {
      let post = data.posts[i];

      let liked = false;

      for (let i = 0; i < post.likes.length && !liked; i++) {
        if (post.likes[i] === data.userId) {
          liked = true;
        }
      }

      let aggregatedPost = {
        id: post.id,
        author: post.author,
        image: post.image,
        text: post.text,
        createdAt: post.createdAt,
        modifiedAt: post.modifiedAt,
        likes: post.likes,
        liked: liked,
      };

      aggregatedPosts[aggregatedPosts.length] = aggregatedPost;
    }

    return aggregatedPosts;
  },
  addPost: function (image, bio) {
    this.validate.text(image, "image URL");
    this.validate.minLength(image, 10, "image URL");
    this.validate.text(bio, "bio");

    const post = {
      id: data.uuid(),
      author: data.userId,
      image: image,
      text: bio,
      createdAt: new Date(),
      modifiedAt: null,
      likes: [],
    };
    data.posts[data.posts.length] = post;

    localStorage.setItem("posts", JSON.stringify(data.posts));
  },
  getOnlineUserInfo() {
    let found;

    for (let i = 0; i < data.users.length && !found; i++) {
      const user = data.users[i];

      if (user.id === data.userId) {
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

    for (let i = 0; i < data.posts.length && !postFound; i++) {
      const post = data.posts[i];

      if (post.id === postId) {
        postFound = post;

        postFoundIndex = i;
      }
    }

    if (!postFound) throw new Error("Post not found");

    let userIdFound;

    for (let i = 0; i < postFound.likes.length; i++) {
      if (data.userId === postFound.likes[i]) userIdFound = data.userId;
    }

    if (!userIdFound) {
      postFound.likes[postFound.likes.length] = data.userId;

      localStorage.posts = JSON.stringify(data.posts);
      // localStorage.posts[postFoundIndex].likes[likesIndex.length] = data.userId;
    } else {
      let likes = [];
      for (let i = 0; i < postFound.likes.length; i++) {
        if (postFound.likes[i] !== data.userId)
          likes[likes.length] = postFound.likes[i];
      }

      // postFound.likes = likes;
      postFound.likes = likes;
      localStorage.posts = JSON.stringify(data.posts);
      // localStorage.posts[postFoundIndex].likes = JSON.stringify(likes);
    }
  },
};
