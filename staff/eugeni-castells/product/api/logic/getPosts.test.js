import { getPosts } from "./getPosts.js";
import { data } from "../data/index.js";

console.info("TEST getPosts");

data
  .connect("mongodb://localhost:27017", "test")
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
