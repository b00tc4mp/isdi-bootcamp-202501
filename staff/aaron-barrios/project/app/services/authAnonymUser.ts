import { errors } from "com"
import { data } from "@/data"
import { router } from "expo-router"

const { SystemError, AuthorizationError } = errors

const authAnonymUser = (): Promise<void> => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth/anon`, {
        method: "POST"
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(async response => {
            const contentType = response.headers.get("Content-Type") || ""

            if (!contentType.includes("application/json")) {
                throw new SystemError("La respuesta no es JSON. Revisa si el endpoint es correcto o está caído.")
            }

            const body = await response.json()

            if (response.status === 201) {
                const { token } = body
                return data.setToken(token) // => HAPPY PATH
            }

            const { message } = body

            //si el backend nos avisa de que ha expirado el token del anonym user:
            if (message === "anonymous-session-expired") {
                await data.removeToken()
                router.replace("/") // o a landing
                throw new AuthorizationError("Tu sesión anónima expiró. Redirigiendo…")
            }

            throw new AuthorizationError('Error al generar usuario anonimo!')
        })
}

export default authAnonymUser