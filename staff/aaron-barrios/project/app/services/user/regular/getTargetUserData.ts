import { errors } from "com"

const { SystemError } = errors

const getTargetUserData = (targetUserId: string): Promise<{
    name: string
    lastName: string
    alias: string
    email: string
    level?: string
}> => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${targetUserId}/data`, {
        method: "GET",
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            return response.json().then(body => {
                if (response.status === 200) return body

                const { error, message } = body
                const Constructor = (errors as any)[error]
                throw new Constructor(message)
            })
        })
}

export default getTargetUserData