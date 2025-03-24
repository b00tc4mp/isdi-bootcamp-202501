import { createPost } from './createPost.js';
import { data } from '../data/index.js';

console.info('TEST createPost');

data.connect('mongodb://localhost:27017', 'test')


.then(()=>{

  try {
   return createPost('m834iqai-q9g8acf555p','https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejhqeHpsY3Q0OWsyZmU1dWlnODgzcmkzZGQwNTllMWc0c3h5NXk4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IpKxfPy33hMRy/giphy.gif','GOAT')
  .then(result=> console.assert(result === undefined, "should not return anything"))// ==> debería retornar undefined siempre que se ejecute correctamente el test

    
  } catch (error) {
    console.error(error);
    
  }

})
.catch((error) => console.error(error))
.finally(() => data.disconnect());