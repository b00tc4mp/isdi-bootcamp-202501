import { data } from "@/data"
import { jwtDecode } from "jwt-decode"
import { errors } from "com"
import { UserRole } from "../../../api/src/data/types"

const { SystemError } = errors

const getUserRole = (): Promise<{ role: UserRole } | null> => {
    return data.getToken()
        .catch(error => { throw new SystemError(error.message) })
        .then(token => {
            if (!token) return null

            try {
                const tokenPayload: any = jwtDecode(token)
                const rawRole = tokenPayload?.role

                const validRoles: UserRole[] = ["anonym", "regular", "mod"]
                if (!validRoles.includes(rawRole)) return { role: "unknown" }

                return { role: rawRole }
            } catch (error) {
                console.error("Token inválido:", error)
                return null
            }
        })
}

export default getUserRole