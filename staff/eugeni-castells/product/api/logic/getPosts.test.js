import "dotenv/config.js";
import { getPosts } from "./getPosts.js";
import { data } from "../data/index.js";
const { MONGO_URL, MONGO_DB_TEST } = process.env;
console.info("TEST getPosts");

data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    try {
      return getPosts("67e6c7b68908f76d62831940").then((posts) => {
        console.assert(posts instanceof Array, "posts is an array");
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
