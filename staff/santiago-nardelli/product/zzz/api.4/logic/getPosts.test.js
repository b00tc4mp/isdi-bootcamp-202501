import 'dotenv/config.js';
import { getPosts } from "./getPosts.js";
import { data } from "../data/index.js";


console.info('TEST getPosts')
const { URL_MONGO, DB_NAME } = process.env;

data.connect(URL_MONGO, DB_NAME)


.then(() => {
  try {

    let result2 = null
    return getPosts('67ebae9e3aed58553be3c372')
    .then((result)=> result2 = result)
    .finally(() => {
      console.assert(result2 instanceof Array, ' result2 is a array');
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al intentar obtener los posts");
  }
})
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => data.disconnect());
