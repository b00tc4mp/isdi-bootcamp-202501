import { getPosts } from "./getPosts.js";
import { data } from "../data/index.js";

console.info("TEST getPosts");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      return getPosts("67dc1e01a779a5da6cb71236").then((posts) => {
        console.assert(posts instanceof Array, "posts is an array");
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
