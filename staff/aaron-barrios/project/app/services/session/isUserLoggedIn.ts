import { data } from "@/data"

const isUserLoggedIn = (): Promise<boolean> => {
    return data.getToken()
        .then(token => !!token)
        .catch(() => false)
}

export default isUserLoggedIn