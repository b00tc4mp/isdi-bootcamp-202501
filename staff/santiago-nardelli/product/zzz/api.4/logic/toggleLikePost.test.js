import "dotenv/config.js";
import { data } from "../data/index.js";
import { toggleLikePost } from "./toggleLikePost.js";

console.info(' TEST toggleLikePost')
const{ URL_MONGO, DB_NAME } = process.env;
data
  .connect(URL_MONGO, DB_NAME)
  .then(() => {
    try {
      let likeResult = null;
      return toggleLikePost(
        "67ebae9e3aed58553be3c373",
        "67ebfb3a8f404f34141d5955"
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
