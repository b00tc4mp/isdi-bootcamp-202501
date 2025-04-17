import { getAllProperties } from "./getAllProperties.js";
import { connectToDatabase, disconnectFromDatabase } from '../../../lib/db/index.js';

console.log("TEST getAllProperties");

connectToDatabase(process.env.DATABASE_URL, process.env.DATABASE_NAME)
  .then(() => {
    try {
        let result = null;
        /*const filters = {
            type: "house",
            bedrooms: 2,
            minPrice: 100000,
            maxPrice: 300000,
            location: "Rosario",
        };
        const pagination = { limit: 10, page: 1 };
    */
        return getAllProperties()
            .then((res) => (result = res))
            .finally(() => console.assert(result !== null, "result should not be null"));
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => disconnectFromDatabase());
