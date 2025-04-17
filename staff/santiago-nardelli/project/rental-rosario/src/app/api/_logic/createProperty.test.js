import {createProperty} from './createProperty.js'
import {connectToDatabase, disconnectFromDatabase} from '../../../lib/db/index.js'  

console.info("TEST createProperties");
console.log("DATABASE_URL", process.env.DATABASE_URL);
console.log("DATABASE_NAME", process.env.DATABASE_NAME);
connectToDatabase(process.env.DATABASE_URL,process.env.DATABASE_NAME)

.then(() => {
  try {

    let result2 = null

    return createProperty({
      title: "Casa en el centro de Rosario",
      description: "Hermosa casa con jardín y pileta",
      price: 150000,
      location: "Rosario, Argentina",
      type: "house",
      bedrooms: 3,
      images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
      airbnbUrl: "https://airbnb.com/example",
      createdAt: new Date(),
    })
      .then(result=> result2 = result)
      .finally(()=> console.assert(result2 === undefined, 'result2 should be undefined'))
  } catch (error) {
    console.error(error);
  }
})
.catch((error) => console.error(error))
.finally(() => disconnectFromDatabase());