import "dotenv/config";

import { data } from "../data/index.js";

import { updatePostLikes } from "./updatePostLikes.js";

const { MONGO_URL, MONGO_DB } = process.env;

console.info("TEST updatePostLikes");

data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    let result2;

    try {
      return updatePostLikes(
        "67e6c7b68908f76d62831941",
        "67e6c7b68908f76d62831944"
      )
        .then((result) => {
          result2 = result;
        })
        .finally(() =>
          console.assert(result2 === undefined, "result is undefined")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
