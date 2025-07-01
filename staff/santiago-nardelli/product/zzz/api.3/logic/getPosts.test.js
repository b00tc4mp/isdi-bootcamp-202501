import { getPosts } from "./getPosts.js";
import { data } from "../data/index.js";


console.info('TEST getPosts')
data.connect("mongodb://localhost:27017", "test")


.then(() => {
  try {

    let result2 = null
    return getPosts("67e06791a55dec8bc9ffd616")
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
