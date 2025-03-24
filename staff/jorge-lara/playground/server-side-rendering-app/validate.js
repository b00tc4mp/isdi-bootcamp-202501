const validate = {
    text(text, explain = 'text') {
        if (typeof text !== 'string') {
            throw new TypeError(`invalid ${explain} type`)
        }
        if (!text.length) {
            throw new RangeError(`invalid ${explain} length`)
        }
    }
}

module.exports = validate