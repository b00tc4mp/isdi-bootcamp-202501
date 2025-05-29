//==> Funcion que recibe un callback y retorna un nuevo callback que maneja los errores que se puedan producir en el callback original y los pasa al siguiente middleware que maneja errores (errorHandler) para que este construya la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler y la envie al cliente que realizo la peticion a la API
  /**
   * Ventajas:
  
  Centraliza el manejo de errores.
  Reduce la duplicación de código en las rutas.
  Permite manejar tanto errores síncronos como asíncronos de manera uniforme.
   */
  
export const withErrorHandling = (callback) => {
    return (req, res, next) => {
      try {
        callback(req, res).catch((error) => {
          next(error);
        });
      } catch (error) {
        next(error);
      }
    };
  }; 