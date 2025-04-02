import "dotenv/config";
import { updateUser } from "./updateUser.js";
import { User } from "../data/index.js";
import { testHandler } from "./testHandler.js";
import { testUser } from "./testUser.js";
import { expect } from "chai";

const updateUserWorks = () => {
  let userId;
  let returnedUser;
  let result2;
  return User.create(testUser)
    .then((user) => {
      userId = user._id.toString();
      return updateUser(userId, { username: "Serginyolet" });
    })
    .then(() => {
      return User.findOne({ username: "Serginyolet" });
    })
    .then((user) => {
      returnedUser = user;
    })
    .finally(() => expect(returnedUser.username).to.equal("Serginyolet"));
};

testHandler("updateUser", [updateUserWorks]);
