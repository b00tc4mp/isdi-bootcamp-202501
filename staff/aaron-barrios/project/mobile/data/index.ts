export const data = {
    _token: undefined as string | undefined,

    get token() {
        return this._token
    },

    set token(value: string | undefined) {
        this._token = value
    }
}