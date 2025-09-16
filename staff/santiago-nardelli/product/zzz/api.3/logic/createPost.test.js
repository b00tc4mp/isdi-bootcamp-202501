import { createPost } from './createPost.js';
import { data } from '../data/index.js';

console.info('TEST createPost');

data.connect('mongodb://localhost:27017', 'test')


.then(()=>{

  try {
   return createPost('67e06791a55dec8bc9ffd616','https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHAyeDR0YjVlZTZrZmVpdG9wZTdwZzJub2VldnQ3OHJvc3JoeDJvdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JBjboimLcWFukn5JTT/giphy.gif','atleti')
  .then(result=> console.assert(result === undefined, "should not return anything"))// ==> debería retornar undefined siempre que se ejecute correctamente el test

    
  } catch (error) {
    console.error(error);
    
  }

})
.catch((error) => console.error(error))
.finally(() => data.disconnect());