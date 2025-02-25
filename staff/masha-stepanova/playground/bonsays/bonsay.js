function Bonsay() {
    let bonsay = {}

    for (let i = 0; i < arguments.length; i++) {
        const currentElement = arguments[i]
        bonsay[i] = currentElement
    }

    bonsay['length'] = arguments.length
    return bonsay
}

module.exports = Bonsay