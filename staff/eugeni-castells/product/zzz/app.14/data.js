const data = {
  uuid: function () {
    return (Math.random() * 10 ** 15).toString(36);
  },
  get users() {
    const users = JSON.parse(localStorage.users || "[]");

    return users;
  },
  set users(users) {
    const json = JSON.stringify(users);

    localStorage.users = json;
  },
  get userId() {
    const userId = JSON.parse(sessionStorage.userId || "null");

    return userId;
  },
  set userId(userId) {
    const json = JSON.stringify(userId);

    sessionStorage.userId = json;
  },
  get posts() {
    const posts = JSON.parse(localStorage.posts || "[]");

    return posts;
  },
  set posts(posts) {
    const json = JSON.stringify(posts);

    localStorage.posts = json;
  },
};
