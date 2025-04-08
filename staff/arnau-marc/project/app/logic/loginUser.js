import { data } from '../data'
// import { validate, errors } from 'com'
// const { SystemError } = errors TODO

export const loginUser = (username, password) => {
    //TODO validate

    return fetch('http://localhost:8080/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new Error(error.message) })

        .then(response => {
            console.log(response.status)

            if(response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) })

                    .then(body => {
                        const { token } = body

                        data.token = token
                    })

            return response.json()
                .catch(error => { throw new Error(error.message) })

                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}
