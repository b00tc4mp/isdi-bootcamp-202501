import { errors } from "com"
import getEnv from "@/data/constants"
import { data } from "@/data"
import { router } from "expo-router"

const { SystemError, AuthorizationError } = errors

const authAnonymUser = (): Promise<void> => {
    const { apiUrl } = getEnv()

    return fetch(`${apiUrl}/users/auth/anon`, {
        method: "POST"
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(async response => {
            const contentType = response.headers.get("Content-Type") || ""

            if (!contentType.includes("application/json")) {
                throw new SystemError("La respuesta no es JSON. Revisa si el endpoint es correcto o está caído.")
            }

            const body = await response.json()

            if (response.status === 201) {
                const { token } = body
                return data.setToken(token)
            }

            const { error, message } = body

            // 🔐 Si el backend nos avisa de expiración de usuario anónimo
            if (message === "anonymous-session-expired") {
                await data.removeToken()
                router.replace("/") // o a landing
                throw new AuthorizationError("Tu sesión anónima expiró. Redirigiendo…")
            }

            const Constructor = (errors as any)[error] || AuthorizationError
            throw new Constructor(message)
        })
}

export default authAnonymUser