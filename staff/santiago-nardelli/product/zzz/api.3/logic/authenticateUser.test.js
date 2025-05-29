import { authenticateUser } from "./authenticateUser.js";
import { data } from "../data/index.js";

console.info("TEST authenticateUser");

data
  .connect("mongodb://localhost:27017", "test")
  .then(() => {
    try {
      return authenticateUser("dubu@idolo.com", "123456")
      .then((result) =>
        console.assert(result === undefined, "should not return anything")
      );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect());
