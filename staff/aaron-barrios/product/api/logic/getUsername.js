import {data} from '../data/index.js'

import { NotFoundError} from '../errors.js'

export const getUsername = userId => {
        const found = data.users.getById(userId)

        if (!found) throw new NotFoundError('user not found')

        return found.name
    }