import { data } from "../data/index.js";
import { modifyPost } from "./modifyPost.js";


console.info("TEST modifyPost");
data
  .connect("mongodb://localhost:27017", "test")

  .then(() => {

    try {

      let postUpdate= null
      return modifyPost(
        "67e06791a55dec8bc9ffd616",
        "67e300ac5a06d56375f8e4fd",
        "Atlti querido"
      ).then((result) => postUpdate = result)
      .finally(() => {
        console.assert(postUpdate === undefined, "result is undefined");
      });

    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
