export const data = {
    get userId() {
        const userId = JSON.parse(sessionStorage.userId || 'null')

        return userId
    },

    set userId(userId) {
        const json = JSON.stringify(userId)

        sessionStorage.userId = json
    }
}