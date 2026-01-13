// Middleware que envuelve una función para manejar errores síncronos y asíncronos.
export const withErrorHandling = callback => {
    return (req, res, next) => {
        try {
            callback(req, res)
                .catch(error => next(error)) //captura errores asíncronos
        } catch (error) {
            next(error) // captura errores síncronos
        }
    }
}
