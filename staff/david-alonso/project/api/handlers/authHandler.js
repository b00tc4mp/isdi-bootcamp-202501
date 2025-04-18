import 'dotenv/config'
// import jwt from 'jsonwebtoken'

// const { JWT_SECRET } = process.env

// console.log('🔐 JWT_SECRET en authHandler:', JWT_SECRET)

// export const authHandler = (req, res, next) => {
//     try {
//         const { authorization } = req.headers

//         if (!authorization) {
//             // Si no hay token, lanzar un error
//             return res.status(401).json({ message: 'Missing authorization header' })
//         }

//         const token = authorization.slice(7)


//         const decoded = jwt.decode(token);
//         console.log('🧾 Token decodificado (sin verificar):', decoded);

//         // Verifica el token usando jwt
//         const { sub: userId } = jwt.verify(token, JWT_SECRET)

//         req.userId = userId

//         next()
//     } catch (error) {
//         // Si hay un error en la verificación del token, respondemos con un 401
//         return res.status(401).json({ message: 'Invalid or expired token' })
//     }
// }



import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const authHandler = (req, res, next) => {
    try {
        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        req.userId = userId

        next()
    } catch (error) {
        next()
    }
}