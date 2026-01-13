import jwt from 'jsonwebtoken' //bliblioteca para manejar los tokens y autenticar los usuarios.

const { JWT_SECRET } = process.env
//Creamos un middleware para manejar la autorización del token (y optimizar cada server de index.js)

export const authHandler = (req, res, next) => {
    try {
        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        req.userId = userId
        
        next()
    } catch (error) {
        next(error)
    }
}
