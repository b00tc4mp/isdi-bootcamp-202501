import { deleteProperty } from "./deleteProperty.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";

console.log("TEST deleteProperty");

connectToDatabase(process.env.DATABASE_URL, process.env.DATABASE_NAME)
  .then(() => {
    try {
      let result2 = null

      return deleteProperty('6800e67010b49a3d0623dcbb')
        .then((result) => (result2 = result))
        .finally(() =>
          console.assert(result2 === undefined, "result is undefined")
        );
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => disconnectFromDatabase());
