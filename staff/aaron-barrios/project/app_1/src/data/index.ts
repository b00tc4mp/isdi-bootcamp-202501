export const data = {
    get token() {
        const id: string = JSON.parse(sessionStorage.token || null)

        return id
    },

    set token(id: string) {
        const json = JSON.stringify(id)

        sessionStorage.token = json
    }
}