export const withErrorHandling = callback => {
    return (req, res, next) => {
        try {
            callback(req, res)
                //ERRORES ASÍNCRONOS
                .catch(error => next(error))
            //ERRORES SÍNCRONOS
        } catch (error) {
            next(error)
        }
    }
}