import { data } from "../data/index.js";

import { updatePostLikes } from "./updatePostLikes.js";

console.info("TEST updatePostLikes");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    let result2;

    try {
      return updatePostLikes(
        "67dc4b9bc7f89659f96ba4c2",
        "67dd6e631a7ad84204324097"
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
