import { data } from "../data/index.js";

import { updatePostText } from "./updatePostText.js";

console.info("TEST updatePostText");
data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      let result2 = null;

      return updatePostText(
        "67dc1e01a779a5da6cb71236",
        "67dd6aa2ca6e0cc11b72c90b",
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
