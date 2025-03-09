import {data} from '../data/index.js'

export const getCurrentUser = () => {
        const foundUser = data.users.find(user => user.state === 'Online')

        if (!foundUser)
            throw new Error('Any user online')
        else
            return foundUser
    }