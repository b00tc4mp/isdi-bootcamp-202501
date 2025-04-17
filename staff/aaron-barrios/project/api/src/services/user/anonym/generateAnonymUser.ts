import jwt from 'jsonwebtoken'
import { User } from '../../../data'
import { errors } from 'com'

const { SystemError } = errors

export function generateAnonymUser(): Promise<string> {
    const timestamp = Date.now()

    return User.create({
        alias: 'temporal1',
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
                { expiresIn: "2h" }
            )

            return token
        })
}

export default generateAnonymUser