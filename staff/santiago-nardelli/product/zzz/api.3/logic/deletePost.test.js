import {data} from '../data/index.js';
import { deletePost } from "./deletePost.js";


console.info('TEST deletePost');

data.connect('mongodb://localhost:27017', 'test')



.then(()=>{

  try {

    let resultDelete = null 

    return  deletePost('67e06791a55dec8bc9ffd616','67e2f11d46e3b9706d9a5381')
    .then(result=> resultDelete= result)
    .finally(()=>console.assert(resultDelete === undefined, "result is underfine"))// ==> debería retornar undefined siempre que se ejecute correctamente
  } catch (error) {
    console.error(error);
    
  }
} )
.catch((error) => console.error(error))
.finally(() => data.disconnect());


