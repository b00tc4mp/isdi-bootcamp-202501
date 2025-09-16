import 'dotenv/config.js';
import {data} from '../data/index.js';
import { deletePost } from "./deletePost.js";


console.info('TEST deletePost');

const { URL_MONGO, DB_NAME } = process.env;
data.connect(URL_MONGO, DB_NAME)



.then(()=>{

  try {

    let resultDelete = null 

    return  deletePost('67ebae9e3aed58553be3c373','67ebf0dd3e7c648fa6911a03')
    .then(result=> resultDelete= result)
    .finally(()=>console.assert(resultDelete === undefined, "result is underfine"))// ==> debería retornar undefined siempre que se ejecute correctamente
  } catch (error) {
    console.error(error);
    
  }
} )
.catch((error) => console.error(error))
.finally(() => data.disconnect());


