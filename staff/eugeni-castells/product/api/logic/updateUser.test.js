import { updateUser } from "./updateUser.js";
import { data } from "../data/index.js";

console.info("TEST updateUserInfo");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      let result2;

      return updateUser("67dc2c792a5c183cf9c079df", {
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
