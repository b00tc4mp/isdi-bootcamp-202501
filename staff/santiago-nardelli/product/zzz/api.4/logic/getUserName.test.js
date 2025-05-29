import 'dotenv/config.js';
import { data } from "../data/index.js";
import { getUserName } from "./getUserName.js";

console.info("TEST getUserName");

const { URL_MONGO, DB_NAME } = process.env;
data
  .connect(URL_MONGO, DB_NAME)
  .then(() => {
    try {
      let userName;

      return getUserName('67ebae9e3aed58553be3c372')
        .then((name) => (userName = name))
        .finally(() => {
          console.assert(typeof userName === "string", 'userName should be a string');
        });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
