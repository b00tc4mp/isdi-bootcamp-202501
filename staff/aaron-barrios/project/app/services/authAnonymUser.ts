import { errors } from "com"
import getEnv from "@/data/constants"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const authAnonymUser = (): Promise<void> => {
    const { apiUrl } = getEnv()

    return fetch(`${apiUrl}/users/auth/anon`, {
        method: "POST"
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response =>
            response.json().then(body => {
                if (response.status === 201) {
                    const { token } = body
                    return data.setToken(token)
                }

                const { error, message } = body
                const Constructor = (errors as any)[error] || AuthorizationError
                throw new Constructor(message)
            })
        )
}

export default authAnonymUser