import { User } from "../data/index.js";
import { registerUser } from "./registerUser.js";
import { testHandler } from "./testHandler.js";
import { testUser } from "./index.js";
import { expect } from "chai";
import { DuplicityError } from "com/errors.js";

const registerUserWorks = () => {
  let result2;
  let user2;

  testUser.password = "123123123";

  return registerUser(testUser)
    .then((result) => {
      result2 = result;
    })
    .then(() => {
      return User.findOne({ name: "Sergi" }).lean();
    })
    .then((user) => {
      user2 = user;
    })
    .finally(() => {
      expect(result2).to.equal(undefined);
      expect(user2).to.be.instanceOf(Object);
      expect(user2).to.include({
        name: "Sergi",
        username: "SerGi",
        email: "ser@gi.com",
      });
    });
};

const registerDoesntWorkRepitedUser = () => {
  let catchedError;

  return User.create(testUser)
    .then(() => registerUser(testUser))
    .catch((error) => (catchedError = error))
    .finally(() => {
      expect(catchedError).to.be.instanceOf(DuplicityError);
      expect(catchedError.message).to.equal("user already exists");
    });
};

testHandler("registerUser", [registerUserWorks, registerDoesntWorkRepitedUser]);
