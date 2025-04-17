import { data } from "@/data"
import { jwtDecode } from "jwt-decode"

const getAuthenticationData = async (): Promise<{ token: string, role: string } | null> => {
    const token = await data.getToken()
    if (!token) return null

    try {
        const decoded: any = jwtDecode(token)
        console.log(token)
        return {
            token,
            role: decoded?.role ?? "unknown"
        }
    } catch (error) {
        console.error("Token inválido:", error)
        return null
    }
}

export default getAuthenticationData