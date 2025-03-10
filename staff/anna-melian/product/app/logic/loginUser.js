import { data } from "../data/index"
import { validate } from "./validate"

import { CredentialsError } from "../errors"


export const loginUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    const found = data.users.findOne(user => user.username === username)

    if (!found || found.password !== password)
        throw new CredentialsError('wrong credentails')

    data.userId = found.id


}