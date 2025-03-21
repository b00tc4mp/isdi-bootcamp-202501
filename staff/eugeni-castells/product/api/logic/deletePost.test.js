import { deletePost } from "./deletePost.js";
import { data } from "../data/index.js";

console.info("TEST deletePost");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      let result2 = null;

      return deletePost("67dc1e01a779a5da6cb71231", "67dd6e7d96f0dc101c4e6517")
        .catch((error) => console.error(error))
        .then((result) => {
          result2 = result;
        })
        .finally(console.assert(result2 === undefined, "result is undefined"));
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
