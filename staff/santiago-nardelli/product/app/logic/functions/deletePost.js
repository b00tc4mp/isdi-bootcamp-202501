import { data } from "../../data/data.js";  // Importa el objeto `data` que contiene información como el `userId`.
import { errors, validate } from "com";  // Importa los objetos `errors` y `validate` que contienen clases de error personalizadas y funciones de validación.

const { SystemError } = errors;  // Desestructura `SystemError` de `errors`, para usarlo más adelante para manejar errores.

export const deletePost = (postId) => {  // Función principal para eliminar un post, recibe un `postId` como parámetro.
  
  // Valida que el `postId` sea correcto utilizando la función `validate.id`. Si no es válido, lanzará un error.
  validate.id(postId, "postId");  

  const { userId } = data;  // Obtiene el `userId` del objeto `data`, que será usado para la autenticación.

  // Realiza una solicitud HTTP `DELETE` para eliminar el post. La URL está construida con el `postId` proporcionado.
  return fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",  // La solicitud es de tipo `DELETE`, que se usa para eliminar un recurso en el servidor.
    headers: {
      Authorization: `Basic ${userId}`,  // Se incluye el `userId` en el encabezado `Authorization` para autenticar la solicitud.
    },
  })
    .catch((error) => {  // Si ocurre un error al hacer la solicitud (por ejemplo, problemas de red), se captura aquí.
      // Lanza un `SystemError` con el mensaje del error si ocurre un fallo en la solicitud `fetch`.
      throw new SystemError(error.message); 
    })
    .then((response) => {  // Si la solicitud `fetch` es exitosa, entra al bloque `then()`.
      
      // Si el código de estado de la respuesta es 204, significa que la operación fue exitosa y no hay contenido que devolver.
      if (response.status === 204) return;  // Retorna inmediatamente sin hacer nada más, ya que la eliminación fue exitosa.

      // Si el código de estado no es 204, intenta convertir la respuesta a JSON para obtener más detalles.
      return response.json()
        .catch((error) => {  // Si hay un error al convertir la respuesta en JSON, se captura aquí.
          // Lanza un `SystemError` con el mensaje de error de la conversión de JSON.
          throw new SystemError(error.message); 
        })
        .then((body) => {  // Si la conversión a JSON es exitosa, entra aquí con el cuerpo de la respuesta.
          const { error, message } = body;  // Extrae el tipo de error y el mensaje de la respuesta.

          // Busca el constructor del error en el objeto `errors` utilizando el tipo de error recibido.
          const constructor = errors[error];  
          
          // Lanza un error personalizado usando el constructor obtenido y el mensaje de error recibido.
          throw new constructor(message);  
        });
    });
};

/**
 * Resumen de los Cambios
Retornar de forma correcta en el primer then: Se corrigió el flujo de promesas al retornar correctamente cuando la respuesta era 204 (sin contenido).
Manejo adecuado de errores: Se mejoró la gestión de errores, asegurando que los errores se manejen correctamente y se devuelvan con una estructura clara.
Condición de status 204: Se manejó correctamente el código HTTP 204, evitando realizar operaciones innecesarias cuando no había contenido en la respuesta.
Uso adecuado de response.json(): Solo se llama a response.json() cuando realmente hay contenido que procesar, lo que mejora la eficiencia.
Por qué esto solucionó el problema
Este enfoque solucionó tu problema porque garantizó que el flujo de promesas fuera manejado correctamente y que la respuesta del servidor se procesara solo cuando fuera necesario. El retorno adecuado en el primer then y el manejo correcto del código de estado 204 evitaron errores que podrían haber causado que la eliminación no se reflejara en la interfaz de usuario.

En resumen, estos cambios aseguraron que el post se eliminara correctamente en el backend, y que el estado de la aplicación (la lista de posts) se actualizara adecuadamente después de la eliminación. Esto resolvió el problema de que la eliminación no se reflejara inmediatamente en la interfaz de usuario.
 */