import "dotenv/config";
import { authenticateUser } from "./authenticateUser.js";
import { data } from "../data/index.js";

console.info("TEST authenticateUser");

const { URL_MONGO, DB_NAME } = process.env;

data
  .connect(URL_MONGO, DB_NAME)
  .then(() => {
    try {
      let id2;
      return authenticateUser("lio@messi.com", "123123123")
        .then((id) => (id2 = id))
        .finally(() => {
          console.assert(typeof id2 === "string", "userId is a string");
        });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
