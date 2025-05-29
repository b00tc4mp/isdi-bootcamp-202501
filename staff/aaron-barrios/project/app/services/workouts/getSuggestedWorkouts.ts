import { errors } from 'com'
import { data } from '@/data'
import { WorkoutType } from 'com/types'

const { SystemError, AuthorizationError } = errors

const getSuggestedWorkouts = (): Promise<WorkoutType[]> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError('No token found')

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/workouts/suggested`, {
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

            return body as WorkoutType[]
        })
}

export default getSuggestedWorkouts