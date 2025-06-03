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

            // console.log("🔍 Response status:", response.status)
            // console.log("🔍 Response body:", body)

            if (response.status === 201) {
                const { token } = body
                return data.setToken(token) // => HAPPY PATH
            }

            const { error, message } = body

            //si el backend nos avisa de que ha expirado el token del anonym user:
            if (message === "anonymous-session-expired") {
                await data.removeToken()
                router.replace("/(anonym)")
                throw new AuthorizationError("Tu sesión anónima expiró. Redirigiendo…")
            }

            throw new SystemError(error.message)
        })
}

export default authAnonymUser