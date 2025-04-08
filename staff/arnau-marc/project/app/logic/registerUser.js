// import { validate, errors } from 'com' TODO
// const { SystemError } = errors TODO

export const registerUser = (name, surname, email, username, password) => {
    // TODO validate

    return fetch('http://localhost:8080/users', {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ name, surname, email, username, password })
    })
        .catch(error => { throw new Error(error.message) })

        .then(response => {
            console.log(response.status)

            if (response.status === 201) 
                return

            return response.json()
                .catch(error => { throw new Error(error.message) })

                .then(body => {
                    const { error, message } = body
                    // const error = body.error
                    // const message = body.message
                    throw new Error(message)
                })
        })
}

