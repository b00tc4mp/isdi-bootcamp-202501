import { errors } from "com"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const changePassword = (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    if (!currentPassword || !newPassword) {
        return Promise.reject(new SystemError("Both current and new password are required"))
    }

    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) throw new AuthorizationError("No token found")

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: {
                        currentPassword,
                        newPassword
                    }
                })
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json().then(body => {
                const { error, message } = body
                const Constructor = (errors as any)[error] || SystemError
                throw new Constructor(message)
            })
        })
}

export default changePassword