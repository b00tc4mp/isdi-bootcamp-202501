import { errors } from 'com'
import getEnv from '@/data/constants'
import { data } from '@/data'
import { WorkoutType } from '../../../api/src/services/types'

const { SystemError, AuthorizationError } = errors
const { apiUrl } = getEnv()

const getAllWorkouts = (): Promise<WorkoutType[]> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${apiUrl}/workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .then(res => res.json())
        .then(body => {
            if ('error' in body) {
                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            }

            return body as WorkoutType[]
        })
        .catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
}

export default getAllWorkouts
