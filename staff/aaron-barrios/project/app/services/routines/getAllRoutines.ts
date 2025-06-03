import { errors } from 'com'
import { data } from '@/data'
import { RoutineType } from 'com/types'

const { SystemError, AuthorizationError } = errors

const getAllRoutines = (): Promise<RoutineType[]> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => res.json())
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body.routines as RoutineType[]
        })
}

export default getAllRoutines