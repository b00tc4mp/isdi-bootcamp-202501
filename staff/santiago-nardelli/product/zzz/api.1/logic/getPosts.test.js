import { getPosts } from "./getPosts.js";

try {
  const post = getPosts('m7yy45qb-rv1cg9xnbg');
  console.log(post);
} catch (error) {
  console.error(error);
  alert("Ocurrió un error al intentar obtener los posts");
  
}