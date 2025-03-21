import { data } from "../data/index.js";
import { getOnlineUserInfo } from "./getOnlineUserInfo.js";

console.info("TEST getOnlineUserInfo");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    let userInfo;
    try {
      return getOnlineUserInfo("67dc4b9bc7f89659f96ba4c2")
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
