import { data } from './../data/index';
import { CredentialsError } from './../errors';
import { validate } from "./validate"

export const loginUser = (username, password) => {
    validate.username(username, 'username');
    validate.password(password, 'password');

    const userFound = data.users.findOne(user => user.username === username);

    if (!userFound) throw new CredentialsError('wrong credentials');
    if (userFound.password !== password) throw new CredentialsError('wrong password');

    data.userId = userFound.id;
};
