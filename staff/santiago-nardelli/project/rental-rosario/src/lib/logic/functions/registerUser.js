import { User } from '../../db/models/index.js'; 
import {errors, validate} from 'com'
import bcrypt from 'bcryptjs';

const { SystemError, DuplicityError} = errors;

export function registerUser(name, email, password) {
    validate.name(name);
    validate.email(email);
    validate.password(password);
    return User.findOne({ name })
        .then(existing => {
            if (existing) {
                throw new DuplicityError('Username already taken');
            }
            return bcrypt.hash(password, 10);
        })
        .then(hash => {
            return User.create({ name, email, password: hash });
        });
}