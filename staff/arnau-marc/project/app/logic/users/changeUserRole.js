import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError } = errors 

export const changeUserRole = () => {
    return data.token
        .then(token => {
            return fetch('http://localhost:8080/users/self/role', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            })
        })
      .catch(error => { throw new SystemError(error.message) })
      .then(response => {
        console.log(response.status)

        if(response.status === 200)
            return response.json()
                .catch(error => { throw new SystemError(error.message) })

                .then(body => {
                    const { token } = body

                    data.token = token
                })

        return response.json()
            .catch(error => { throw new SystemError(error.message) })

            .then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
    })
}