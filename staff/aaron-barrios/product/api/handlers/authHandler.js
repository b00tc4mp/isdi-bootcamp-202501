import jwt from 'jsonwebtoken'

const {JWT_SECRET} = process.env

export const authHandler = (req, res, next) => {
    try{
        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        req.userId = userId

        next() //=> le pasamos el userId a la request del endpoint de api
    }catch(error){
        next(error)
    }
}