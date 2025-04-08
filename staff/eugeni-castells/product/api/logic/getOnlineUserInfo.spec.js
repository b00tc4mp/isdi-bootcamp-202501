import "dotenv/config";
import { User } from "../data/index.js";
import { getOnlineUserInfo } from "./getOnlineUserInfo.js";
import { expect } from "chai";
import { testHandler } from "./testHandler.js";
import { NotFoundError } from "com/errors.js";

const getOnlineUserNameWorks = () => {
  let userInfo;

  return User.create({
    name: "MaSha",
    username: "mashinski",
    password: "$2b$12$XePBJgFgYNcwFk9X2YFJK.MIEE7soiPZznIqeameT9PWuhDG3dHEa",
    email: "ma@sha.com",
  })
    .then((user) => getOnlineUserInfo(user._id.toString()))
    .then((user) => (userInfo = user))
    .finally(() => expect(userInfo).to.be.instanceOf(Object));
};

const getOnlineUserNameFails = () => {
  let catchedError;

  return getOnlineUserInfo("2FDF93C125DEC91B087BF8C7")
    .catch((error) => (catchedError = error))
    .finally(() => {
      expect(catchedError).to.be.instanceOf(NotFoundError);
      expect(catchedError.message).to.equal("user not found");
    });
};

testHandler("getOnlineUserInfo", [
  getOnlineUserNameWorks,
  getOnlineUserNameFails,
]);
