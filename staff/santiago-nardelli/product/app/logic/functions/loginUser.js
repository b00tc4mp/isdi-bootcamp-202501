import { data } from "../../data/data.js";
import {errors, validate} from 'com'
const { SystemError } = errors;

export const loginUser = (email, password) => {
  validate.email(email, "email");
  validate.password(password, "password");

 /**
  * 1- fetch a la ruta de autenticacion
  * 2- metodo post
  * 3- headers con content-type, no pido authorization por que no tengo token aun 
  * 4- envio un objeto con email y password en formato json 
  */
 return fetch('http://localhost:3000/users/auth', {
  method: 'POST',
  headers: {
    //por que aqui no pido la authorization?
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password })
 })

 .catch(error => {
  throw new SystemError(error.message);
  })
  .then(response =>{
    if(response.status === 200) return response.json()
      .catch(error => {
        throw new SystemError(error.message);
      })
      .then(body=>{
        const{id}= body

        data.userId = id
      })
      return response.json()
      .catch(error => {
        throw new SystemError(error.message);
      })
      .then(body=>{
        const {error, message}= body

        const constructor = errors[error]

        throw new constructor(message)
      })

    })

  
};
