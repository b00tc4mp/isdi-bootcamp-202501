// import { data } from '../../data/data.js';
// import { errors} from "com";

// const { SystemError } = errors;

// export const getPosts = () => {
//   const { userId } = data;

//   return fetch("http://localhost:3000/posts", {
//     method: "GET",
//     headers: {
//       Authorization: `Basic ${userId}`,
//     },
//   })
//     .catch((error) => {
//       throw new SystemError(error.message);
//     })
//     .then((response) => {
//       if (response.status === 200)
//         return response
//           .json()
//           .catch((error) => {
//             throw new SystemError(error.message);
//           })
//           .then((body) => {
//             const posts = body;

//             posts.forEach((post) => {
//               post.createdAt = new Date(post.createdAt);
//               if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt);
//             });

//             return posts;
//           });

//       return response
//         .json()
//         .catch((error) => {
//           throw new SystemError(error.message);
//         })
//         .then((body) => {
//           const { error, message } = body;

//           const constructor = errors[error];

//           throw new constructor(message);
//         });
//     });
// };

import { data } from "../../data/data.js"; // Importa el objeto `data` que contiene información como el `userId`.
import { errors } from "com"; // Importa el objeto `errors`, que contiene clases de error personalizadas.

const { SystemError } = errors; // Desestructura `SystemError` de `errors` para usarlo más tarde.

export const getPosts = () => {
  const { userId } = data; // Obtiene el `userId` de los datos importados, que se usará para la autenticación en la solicitud.

  return fetch("http://localhost:3000/posts", {
    // Realiza una solicitud HTTP GET al servidor para obtener los posts.
    method: "GET", // Especifica que la solicitud es de tipo GET (para obtener datos).
    headers: {
      Authorization: `Basic ${userId}`, // Se pasa el `userId` en el encabezado `Authorization` para autenticar al usuario.
    },
  })
    .catch((error) => {
      // Maneja errores en la solicitud `fetch`.
      // Si la solicitud `fetch` falla (por ejemplo, problemas de red), captura el error y lanza un `SystemError`.
      throw new SystemError(error.message);
    })
    .then((response) => {
      // Esta función se ejecuta si la solicitud `fetch` se completa con éxito.
      // Aquí, estamos manejando la respuesta de la API. Si la respuesta tiene un código de estado 200, es exitosa.
      if (response.status === 200)
        return response // Si la respuesta es exitosa (status 200), procesamos la respuesta en formato JSON.
          .json() // Convierte la respuesta a un objeto JSON. Esto devuelve otra promesa.
          .catch((error) => {
            // Si ocurre un error al convertir la respuesta a JSON, se captura aquí.
            // Si la conversión JSON falla, lanzamos un `SystemError` con el mensaje del error.
            throw new SystemError(error.message);
          })
          .then((body) => {
            // Cuando la conversión a JSON es exitosa, procesamos el cuerpo de la respuesta.
            const posts = body; // Extraemos los posts del cuerpo JSON.

            // Aquí se procesan las fechas de cada post (convertimos las fechas a objetos `Date`).
            posts.forEach((post) => {
              post.createdAt = new Date(post.createdAt); // Convierte `createdAt` en un objeto `Date`.
              if (post.modifiedAt) post.modifiedAt = new Date(post.modifiedAt); // Convierte `modifiedAt` si existe.
            });

            return posts; // Después de procesar las fechas, retornamos los posts procesados.
          });

      // Si la respuesta no tiene un código de estado 200, se ejecuta este bloque.
      // Aquí estamos manejando los casos en los que la respuesta no es exitosa (por ejemplo, 404, 500, etc.).
      return response
        .json() // Intentamos procesar la respuesta como JSON para obtener detalles sobre el error.
        .catch((error) => {
          // Si ocurre un error al convertir la respuesta de error a JSON, lo capturamos aquí.
          // Lanza un `SystemError` si la conversión JSON de la respuesta falla.
          throw new SystemError(error.message);
        })
        .then((body) => {
          // Si la conversión JSON es exitosa, procesamos el cuerpo del error.
          const { error, message } = body; // Extraemos el tipo de error y el mensaje de la respuesta de error.

          const constructor = errors[error]; // Busca el constructor del error correspondiente en el objeto `errors`.

          throw new constructor(message); // Lanza el error personalizado con el mensaje recibido.
        });
    });
};
