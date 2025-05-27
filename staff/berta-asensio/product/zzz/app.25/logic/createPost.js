import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const createPost = (image, text) => {
        validate.url(image, 'image')
        validate.maxLength(image, 1000, 'image')
        validate.text(text, 'text')
        validate.maxLength(text, 500, 'text')

        const { token } = data

        return fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image, text })
        })

            .catch(error => { throw new SystemError(error.message) })            
            .then(response => {//después de este then, si todo va bien, va al siguiente then que está en createpost.jsx
               
                if(response.status === 201)
                    return //este return es el que nos lleva al then de createpost.jsx
                
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })                    
                    .then(body => {
                        const { error, message } = body

                        const constructor = errors[error]

                        throw new constructor(message)
                    })
            })
}