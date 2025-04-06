import "dotenv/config";
import { data } from "../data/index.js";
import { getOnlineUserInfo } from "./getOnlineUserInfo.js";

const { MONGO_URL, MONGO_DB_TEST } = process.env;

console.info("TEST getOnlineUserInfo");

data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    let userInfo;
    try {
      return getOnlineUserInfo("67e6c7b68908f76d6283193f")
        .then((info) => {
          userInfo = info;
        })
        .finally(() => console.assert(userInfo instanceof Object));
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
