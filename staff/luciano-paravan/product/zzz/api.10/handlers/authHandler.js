import jwt from 'jsonwebtoken' //jwt interviene desde la authentication en adelante, en cualquier otra ruta que venga despues va a haber que usarlo para verificar el usuario
const { JWT_SECRET } = process.env

export const authHandler = (req, res, next) => {
    try {
        const { authorization } = req.headers //Para acceder a la cabecera del curl -H 'Authorization...'
        //Enviaremos un token

        const token = authorization.slice(7) //Extraigo el valor de la autorization del curl con slice cortando desde ese indice hasta el final, lo que esta despues de Basic

        const { sub: userId } = jwt.verify(token, JWT_SECRET) //El token generado en authentication se verifica aca

        req.userId = userId //Para que de authHandler llegue el userId a withErrorHandling hay que mutar la request

        next() //Cuando haces el next sin error, te envia al siguiente handler
    } catch (error) {
        next(error)
    }
}