import { data } from '../data'
import { validate } from './validate'

//import { CredentialsError } from '../errors.js'


export const loginUser = (username, password) => {
        validate.username(username, 'username')
        validate.password(password, 'password')

        return fetch('http://localhost:8080/users/auth', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
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
                                        const { id } = body

                                        data.userId = id //se guarda en session storage en forma de json
                                })
                        return
                })
}
