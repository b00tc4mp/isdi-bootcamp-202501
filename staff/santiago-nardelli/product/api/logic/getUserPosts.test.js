import 'dotenv/config.js';
import { getUserPosts } from "./getUserPosts.js";
import { data } from "../data/index.js";


console.info('TEST getUserPosts')
const { URL_MONGO, DB_NAME } = process.env;

data.connect(URL_MONGO, DB_NAME)


.then(() => {
  try {

    let result2 = null
    return getUserPosts('67ed5884c70a54885c736530','67ed5884c70a54885c73652c')
    .then((result)=> result2 = result)
    .finally(() => {
      console.assert(result2 instanceof Array, ' result2 is an array');
    });
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al intentar obtener los posts del usuario");
  }
})
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => data.disconnect());
