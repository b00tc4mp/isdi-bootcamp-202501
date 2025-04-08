
export const data = {

    //la session hay que mantenerla en la app
    get token() {
        const id = JSON.parse(sessionStorage.token || 'null')

        return id
    },

    set token(id) {
        const json = JSON.stringify(id)
        sessionStorage.token = json
    }
}

