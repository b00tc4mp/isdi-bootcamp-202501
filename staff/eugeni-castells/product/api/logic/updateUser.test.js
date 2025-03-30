import "dotenv/config";
import { updateUser } from "./updateUser.js";
import { data } from "../data/index.js";
const { MONGO_URL, MONGO_DB } = process.env;
console.info("TEST updateUserInfo");

data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    try {
      let result2;

      return updateUser("67e6c7b68908f76d6283193f", {
        name: "lucchio",
        username: "luciano",
      })
        .then((result) => (result2 = result))
        .finally(() =>
          console.assert(result2 === undefined, "result is undefined")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());

//
