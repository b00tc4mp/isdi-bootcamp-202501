import { data } from './../data/index';

export const getCurrentUser = () => {
    const { userId } = data

    return fetch('http://localhost:8080/users/self', {
        method: 'GET',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) })
                    .then(body => {
                        const { user } = body

                        return user
                    })
            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}