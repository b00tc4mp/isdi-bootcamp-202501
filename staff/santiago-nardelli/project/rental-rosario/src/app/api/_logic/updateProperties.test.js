import { updateProperty } from "./updateProperties.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/db/index.js";

console.log("TEST updateProperties");

connectToDatabase(process.env.DATABASE_URL, process.env.DATABASE_NAME)
  .then(() => {
    try {
      let result2;

      return updateProperty("6800e67010b49a3d0623dcbb", {
        title: "apartment en el centro de Fisherton",
        description: "Hermoso apartamento con amenitis",
        price: 150000,
        location: "Rosario, Argentina",
        type: "apartment",
        bedrooms: 3,
        images: [
          "https://example.com/image1.jpg",
          "https://example.com/image3.jpg",
        ],
        airbnbUrl: "https://airbnb.com/example",
        createdAt: new Date(),
      })
      .then(result => result2 = result)
      .finally(() => console.assert(result2 === undefined, 'result is undefined'))
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => console.error(error))
  .finally(() => disconnectFromDatabase());
