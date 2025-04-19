import { data } from "@/data"
import { jwtDecode } from "jwt-decode"
import { errors } from "com"

const { SystemError } = errors

const getUserRole = (): Promise<{ role: string } | null> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) return null

            try {
                const tokenPayload: any = jwtDecode(token)
                if (!tokenPayload || !tokenPayload.role) return { role: "unknown" }

                return { role: tokenPayload.role }
            } catch (error) {
                console.error("Token inválido:", error)
                return null
            }
        })
}

export default getUserRole