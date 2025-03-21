import { errors } from "com";
import { data } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";

const { SystemError } = errors;

console.info("TEST authenticateUser");

data
  .connect("mongodb://localhost:27017", "test")
  .catch((error) => {
    throw new SystemError(error.message);
  })
  .then(() => {
    try {
      let userId;

      return authenticateUser("quesitos", "bouRules")
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
