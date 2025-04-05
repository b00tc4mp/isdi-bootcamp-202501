import "dotenv/config";
import { data } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";

const { MONGO_URL, MONGO_DB } = process.env;

console.info("TEST authenticateUser");

data
  .connect(MONGO_URL, MONGO_DB)
  .then(() => {
    let token;
    try {
      return authenticateUser("lucho", "123123123")
        .then((info) => {
          token = info;
        })
        .finally(() => console.assert(typeof token === "string"));
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
