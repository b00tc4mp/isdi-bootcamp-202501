import { errors } from 'com'
import { data } from '@/data'
import { UserType } from 'com/types'

const { SystemError, AuthorizationError } = errors

const updateUserData = (
    updates: Omit<UserType, 'id' | 'createdAt'>,
    current: Omit<UserType, 'id' | 'createdAt'>
): Promise<void> => {
    if (!current) throw new Error("No current user data available")

    const filteredUpdates: Partial<Omit<UserType, "id" | "createdAt">> = { ...updates }

    if (filteredUpdates.name === current.name) delete filteredUpdates.name
    if (filteredUpdates.lastName === current.lastName) delete filteredUpdates.lastName
    if (filteredUpdates.alias === current.alias) delete filteredUpdates.alias
    if (filteredUpdates.email === current.email) delete filteredUpdates.email

    if (Object.keys(filteredUpdates).length === 0) {
        console.log("🟡 No user data changes detected, skipping update.")
        return Promise.resolve()
    }

    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(filteredUpdates)
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json().then(body => {
                if ('error' in body) {
                    const { error, message } = body
                    const Constructor = (errors as any)[error] || SystemError
                    throw new Constructor(message)
                }
            })
        })
}

export default updateUserData