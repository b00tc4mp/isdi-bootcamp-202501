import jwt from 'jsonwebtoken'
import { User } from '../../../data'
import { errors } from 'com'

const { SystemError } = errors

function generateAnonymUser(): Promise<string> {
    const timestamp = Date.now()

    return User.create({
        alias: `a${timestamp}`,
        email: `anon${timestamp}@anon.com`,
        password: `anonPassword${timestamp}`,
        role: "anonym"
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            console.log("✅ Usuario anónimo creado:", user)

            const token = jwt.sign(
                { sub: user._id.toString(), role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: "23h" }
            )

            return token
        })
}

export default generateAnonymUser