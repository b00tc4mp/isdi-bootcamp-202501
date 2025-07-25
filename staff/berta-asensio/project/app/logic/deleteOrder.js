import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError } = errors

export const deleteOrder = (orderId) => {
    validate.id(orderId, 'orderId')

    const { token } = data

    return fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
        .catch(error => { throw new SystemError(error.message) })        
        .then(response => {
            
            if(response.status === 204)
                return
            
            return response.json()
                .catch(error => { throw new SystemError(error.message) })                
                .then(body => {
                    const { error, message } = body
                    
                    const constructor = errors[error]
          
                    throw new constructor(message)
                })
        })
    }
