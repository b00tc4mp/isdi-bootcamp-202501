import "dotenv/config";

import { data } from "../data/index.js";

import { updatePostText } from "./updatePostText.js";

const { MONGO_URL, MONGO_DB_TEST } = process.env;

console.info("TEST updatePostText");
data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    try {
      let result2 = null;

      return updatePostText(
        "67e6c7b68908f76d62831941",
        "67e6c7b68908f76d62831944",
        "test 3"
      )
        .then((result) => {
          result2 = result;
        })
        .catch((error) => console.error(error))
        .finally(() =>
          console.assert(result2 === undefined, "result is undefined")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
