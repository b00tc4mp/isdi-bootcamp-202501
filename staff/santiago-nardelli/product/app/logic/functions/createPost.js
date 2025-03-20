import { data } from "../../data/data.js";

import {errors, validate} from 'com'

const {SystemError} = errors
export const createPost = (image, title) => {
  //valido que la imagen y el titulo sean de tipo string
  validate.text(image, "image");
  validate.maxLength(1000);
  validate.text(title, "title");
  validate.maxLength(500);

  // Extraigo el userId del objeto data
  const { userId } = data;

  // Utilizo mi recurso fetch que me permite llamar a la ruta http://localhost:3000/posts de mi servidor y le paso un objeto con la configuración de la petición que incluye el método HTTP, los headers y el cuerpo de la petición que en este caso es un objeto con la imagen y el titulo del post
  //El método fetch devuelve una promesa que se resuelve con la respuesta de la petición HTTP


  return fetch("http://localhost:3000/posts", {
    // Defino el método HTTP
    method: "POST",
    // Defino los headers que son los encabezados de la petición que en este caso incluyen la autorización y el tipo de contenido
    headers: {
      Authorization: `Basic ${userId}`,
      "Content-Type": "application/json ",
    },
    //Defino el cuerpo de la petición que en este caso es un objeto con la imagen y el titulo del post
    body: JSON.stringify({ image, title }),
  })
  //Trabajamos el resultado de la promesa en este caso si la promesa no se resuelve correctamente lanzamos un error
  .catch((error) => {
    throw new SystemError(error.messege);
  })

  //Si la promesa se resuelve correctamente devolvemos el resultado
  .then((response)=>{
    console.log(response.status)
    //Si el status de la respuesta es 201 devolvemos el body de la respuesta
    if(response.status === 201) return 
    
    return response.json()
      //Si el status de la respuesta no es 201 lanzamos un error
      .catch((error) => {
        throw new SystemError(error.messege);
      })
      //Este then se ejecuta si la promesa se resuelve correctamente y el status de la respuesta no es 201
      .then((body)=>{
        const {error, messege}= body

        const constructor = errors[error]
        throw new constructor(messege)
      })

  })
}