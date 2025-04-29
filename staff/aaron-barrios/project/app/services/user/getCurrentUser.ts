import { data } from "@/data"
import { errors } from "com"

const { AuthorizationError, SystemError } = errors

const getCurrentUser = (): Promise<{ id: string }> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        })
        .then(res => res.json())
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
            if ('error' in body) throw new SystemError(body.message)
            return body as { id: string }
        })
}

export default getCurrentUser