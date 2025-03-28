import "dotenv/config";
import { deletePost } from "./deletePost.js";
import { data } from "../data/index.js";

const { MONGO_URL, MONGO_DB } = process.env;

console.info("TEST deletePost");

data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    try {
      let result2 = null;

      return deletePost("67e6c7b68908f76d62831931", "67e6c7b68908f76d62831943")
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
