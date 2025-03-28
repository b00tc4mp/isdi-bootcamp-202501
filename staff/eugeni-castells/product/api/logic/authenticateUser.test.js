import "dotenv/config";
import { errors } from "com";
import { data } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";

const { MONGO_URL, MONGO_DB } = process.env;

const { SystemError } = errors;

console.info("TEST authenticateUser");

data
  .connect(MONGO_URL, MONGO_DB)
  .catch((error) => {
    throw new SystemError(error.message);
  })
  .then(() => {
    try {
      let userId;

      return authenticateUser("lucho", "123123123")
        .then((id) => (userId = id))
        .finally(() =>
          console.assert(typeof userId === "string", "userId is a string")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
