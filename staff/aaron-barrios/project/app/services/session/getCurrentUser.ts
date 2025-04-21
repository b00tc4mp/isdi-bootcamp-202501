import { data } from "@/data"
import { errors } from "com"

const { AuthorizationError, SystemError } = errors

const getCurrentUser = (): Promise<{ id: string }> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/self`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        })
        .then(res => res.json())
        .then(body => {
            if ('error' in body) throw new SystemError(body.message)
            return body as { id: string }
        })
}

export default getCurrentUser