export const withErrorHandling = callback => { //Esta funcion es la que ahora llama a las rutas
    return (req, res, next) => {
        try {
            callback(req, res)
                .catch(error => next(error))
        } catch (error) {
            next(error)
        }
    }
}
