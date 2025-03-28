import "dotenv/config";
import { addPost } from "./addPost.js";
import { data } from "../data/index.js";

console.info("TEST addPost");

const { MONGO_URL, MONGO_DB } = process.env;
data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    try {
      let result2 = null;

      return addPost(
        "67e6b07ba512fb2562114068",
        "https://media.giphy.com/media/lg23waF4O25ot2cRIF/giphy.gif?cid=790b7611n2m3s8805uafk8prl2ny9o33hfdwx1r0p7mjcmwv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
        "let's go"
      )
        .then((result) => (result2 = result))
        .finally(() =>
          console.assert(result2 === undefined, "result is undefined")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
