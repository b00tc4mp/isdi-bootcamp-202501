import { useEffect, useState } from 'react'
import { useToken } from './useToken'

//determina si el usuario está autenticado o no (si hay token)
export function useSession() {
    const { token, saveToken, removeToken, loading } = useToken()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (!loading) {
            setIsAuthenticated(!!token)
        }
    }, [token, loading])

    return {
        isAuthenticated,
        token,
        loading,
        login: saveToken,
        logout: removeToken,
    }
}
