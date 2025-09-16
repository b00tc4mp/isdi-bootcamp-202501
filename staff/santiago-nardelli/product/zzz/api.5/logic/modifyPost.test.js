import 'dotenv/config.js';
import { data } from "../data/index.js";
import { modifyPost } from "./modifyPost.js";


console.info("TEST modifyPost");
const { URL_MONGO, DB_NAME } = process.env;
data
  .connect(URL_MONGO, DB_NAME)

  .then(() => {

    try {

      let postUpdate= null
      return modifyPost(
        "67ebae9e3aed58553be3c377",
        "67ebae9e3aed58553be3c37b",
        "Atltiiiiiiiiiiiiii querido"
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
