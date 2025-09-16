import { createPost } from './createPost.js';


try {
 const newPost= createPost('m834iqai-q9g8acf555p','https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejhqeHpsY3Q0OWsyZmU1dWlnODgzcmkzZGQwNTllMWc0c3h5NXk4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IpKxfPy33hMRy/giphy.gif','GOAT');
 console.log(newPost);
  console.log('Post creado correctamente');
  
} catch (error) {
  console.error(error);
  
}