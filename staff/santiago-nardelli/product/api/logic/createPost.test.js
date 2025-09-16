import 'dotenv/config.js'; // Load environment variables from .env file
import { createPost } from './createPost.js';
import { data } from '../data/index.js';

console.info('TEST createPost');
const { URL_MONGO, DB_NAME } = process.env;

data.connect(URL_MONGO, DB_NAME)
  

.then(()=>{

  try {
    
    let result2
   return createPost('67ebae9e3aed58553be3c373','https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHAyeDR0YjVlZTZrZmVpdG9wZTdwZzJub2VldnQ3OHJvc3JoeDJvdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JBjboimLcWFukn5JTT/giphy.gif','atleti')
   .then((result)=> result2 = result)
   .finally(() => {
      console.assert(result2 === undefined, 'result2 should be undefined');
    });
  

    
  } catch (error) {
    console.error(error);
    
  }

})
.catch((error) => console.error(error))
.finally(() => data.disconnect());