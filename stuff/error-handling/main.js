function whatever() {
    //throw new Error('hi error')
    throw new TypeError('hi error')
}

try {
    whatever()
} catch (error) {
    if (error.constructor.name === 'Error')
        alert('error xungo, no sé que ha pasao')
    else if (error.constructor.name === 'TypeError')
        alert('illo, mirate esssse número')
}

//

function whatever() {
    throw new Error('hi error')
    // throw new TypeError('hi error')
}

try {
    whatever()
} catch (error) {
    if (error instanceof Error) // WARN it matches all errors, generic and specific
        alert('error xungo, no sé que ha pasao')
    else if (error instanceof TypeError)
        alert('illo, mirate esssse número')
}

//

function whatever() {
    throw new Error('hi error')
    //throw new TypeError('hi error')
}

try {
    whatever()
} catch (error) {
    if (error instanceof TypeError)
        alert('illo, mirate esssse número')
    else if (error instanceof Error)
        alert('error xungo, no sé que ha pasao')
}