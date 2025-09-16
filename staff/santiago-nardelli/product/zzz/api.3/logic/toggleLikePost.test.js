import { data } from "../data/index.js";
import { toggleLikePost } from "./toggleLikePost.js";

console.info(' TEST toggleLikePost')
data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      let likeResult = null;
      return toggleLikePost(
        "67e06791a55dec8bc9ffd616",
        "67e315394d855460c56a0fa9"
      )
        .then((result) => {
          likeResult = result;
        })
        .finally(() => {
          console.assert(likeResult === undefined, "result is undefined");
        });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => {
    data.disconnect();
  });
