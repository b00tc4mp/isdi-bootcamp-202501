import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { DuplicityError } = errors

export const registerUser = (name, username, password, email) => {
    validate.name(name, 'name')
    validate.username(username, 'username')
    validate.password(password, 'password')
    validate.email(email, 'email')

    const found = data.users.findOne(user => user.email === email || user.username === username)

    if(found) throw new DuplicityError('user already exists')
    
    const user = {
        name: name, 
        username: username, 
        password: password, 
        email: email,
        createdAt: new Date(), 
        modifiedAt: null
    }

    data.users.insertOne(user)
}