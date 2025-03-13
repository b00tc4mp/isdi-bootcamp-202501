import { getPosts } from "./getPosts.js";

try {
  const post = getPosts('m834puyy-ae4e753rhb7');
  console.log(post);
} catch (error) {
  console.error(error);
  alert("Ocurrió un error al intentar obtener los posts");
  
}