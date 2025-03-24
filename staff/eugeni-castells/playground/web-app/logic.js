const data = require("./data.js");

const { users, uuid } = data;

const logic = {
  registerUser(name, username, password) {
    let user;

    user = users.find((user) => user.username === username);

    if (user) throw new Error("user already exists");

    user = {
      name,
      username,
      password,
      createdAt: new Date(),
      modifiedAt: null,
      id: uuid(),
    };

    users.push(user);
  },
  authenticateUser(username, password) {
    let user;

    user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) throw new Error("user not found");

    return user.id;
  },
  getUserName(userId) {
    let user;

    user = users.find((user) => user.id === userId);

    if (!user) throw new Error("user not found");

    return user.name;
  },
};

module.exports = logic;
