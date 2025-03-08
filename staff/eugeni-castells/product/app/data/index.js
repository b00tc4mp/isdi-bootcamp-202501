import { Collection } from "./Collection";

const data = {
  users: new Collection("users"),
  posts: new Collection("posts"),

  get userId() {
    const userId = JSON.parse(sessionStorage.userId || "null");

    return userId;
  },
  set userId(userId) {
    const json = JSON.stringify(userId);

    sessionStorage.userId = json;
  },
};

export default data;
