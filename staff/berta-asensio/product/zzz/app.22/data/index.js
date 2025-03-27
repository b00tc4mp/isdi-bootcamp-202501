
export const data = {

    //la session hay que mantenerla en la app
    get userId() {
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },

    set userId(id) {
        const json = JSON.stringify(id)
        sessionStorage.userId = json
    }
}

