import { errors } from "com"
import { data } from "@/data"

const { AuthorizationError, SystemError } = errors

const deleteAnonymUser = (): Promise<void> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth/anon`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            return res.json().then(body => {
                if (!res.ok) {
                    const { error, message } = body
                    const Constructor = (errors as any)[error] || SystemError
                    throw new Constructor(message)
                }

                return data.removeToken()
            })
        })
}

export default deleteAnonymUser