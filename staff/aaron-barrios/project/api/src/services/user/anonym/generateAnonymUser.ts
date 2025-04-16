import jwt from 'jsonwebtoken'

import { User } from '../../../data'
import { errors } from 'com'

const { SystemError } = errors

const generateAnonymUser = (): Promise<void> => {
    const timestamp = Date.now()

    const anonymUserData = {
        alias: `anon_${timestamp}`,
        role: 'anonym',
        createdAt: new Date()
    }

    return User.create(anonymUserData)
        .then(user => {
            return jwt.sign(
                { sub: user._id.toString(), role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            )
        })
        .catch(error => {
            console.error(error)
            throw new SystemError('Failed to create anonymous user')
        })
        .then(() => { })
}

export default generateAnonymUser