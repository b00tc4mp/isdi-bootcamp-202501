import { errors } from 'com'
import { data } from '@/data'
import { UserDocType } from '../../api/src/data/types'

const { SystemError, AuthorizationError } = errors


const getCurrentUser = (): Promise<Omit<UserDocType, 'password' | '__v' | '_id'> & {
    id: string
    createdAt: string
    modifiedAt: string | null
}> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        })
        .then(res => res.json())
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            const {
                alias,
                email,
                role,
                name = null,
                lastName = null,
                level = null,
                interests = [],
                createdAt,
                modifiedAt = null,
                _id,
            } = body

            return {
                id: _id,
                alias,
                email,
                role,
                name,
                lastName,
                level,
                interests,
                createdAt,
                modifiedAt,
            }
        })
}

export default getCurrentUser
