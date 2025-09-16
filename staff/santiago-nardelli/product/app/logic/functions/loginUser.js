import { data } from "../../data/data.js";
import {errors, validate} from 'com'
const { SystemError } = errors;

export const loginUser = (email, password) => {
  validate.email(email);
  validate.password(password);

 
 return fetch('http://localhost:3000/user/auth', {
  method: 'POST',
  headers: {
    
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
        const{token}= body

        data.token = token
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
