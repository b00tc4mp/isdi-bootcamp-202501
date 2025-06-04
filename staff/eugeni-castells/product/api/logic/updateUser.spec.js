import "dotenv/config";
import { updateUser } from "./updateUser.js";
import { User } from "../data/index.js";
import { testHandler } from "./testHandler.js";
import { testUser } from "./testUser.js";
import { expect } from "chai";
import { NotFoundError, ValidationError, SystemError } from "com/errors.js";

const updateUserWorks = () => {
  let userId;
  let returnedUser;
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

const updateUserFailsNotFound = () => {
  return expect(
    updateUser("93ACC64A29AABEBA7172C333", "93ACC64A29AABEBA7172C333", {
      username: "test failed",
    })
  ).to.be.rejectedWith(NotFoundError, "user not found");
};

const updateUserFailsTextTypeValidate = () => {
  let userId;

  return User.create(testUser).then((user) => {
    userId = user._id.toString();
    return expect(updateUser(userId, { username: 123 })).to.be.rejectedWith(
      ValidationError,
      "invalid username type"
    );
  });
};
const updateUserFailsTextLengthValidate = () => {
  let userId;

  return User.create(testUser).then((user) => {
    userId = user._id.toString();
    return expect(updateUser(userId, { username: "1" })).to.be.rejectedWith(
      ValidationError,
      "invalid username range error"
    );
  });
};
const updateUserFailsNameTypeValidate = () => {
  let userId;

  return User.create(testUser).then((user) => {
    userId = user._id.toString();
    return expect(updateUser(userId, { name: 1 })).to.be.rejectedWith(
      ValidationError,
      "invalid name type"
    );
  });
};

testHandler("updateUser", [
  updateUserWorks,
  updateUserFailsNotFound,
  updateUserFailsTextTypeValidate,
  updateUserFailsTextLengthValidate,
  updateUserFailsNameTypeValidate,
]);
