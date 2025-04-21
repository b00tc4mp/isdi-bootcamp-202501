import { data } from "@/data"
import { errors } from "com"

const { AuthorizationError, SystemError } = errors

const getUserData = (): Promise<{
    id: string
    alias: string
    email: string
    role: string
    name?: string
    lastName?: string
    level?: string
    interests?: string[]
    createdAt: string
    modifiedAt: string | null
}> => {
    return data.getToken()
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/data`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        })
        .then(res => res.json())
        .then(body => {
            if ("error" in body) throw new SystemError(body.message)
            return body
        })
}

export default getUserData