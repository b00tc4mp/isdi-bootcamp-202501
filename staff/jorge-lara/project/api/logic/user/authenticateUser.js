import { User } from "../../data/index.js"
import bcrypt from "bcryptjs";
import { errors, validate } from "com";

const { NotFoundError, CredentialsError } = errors;

export const authenticateUser = (email, password) => {
    validate.email(email, "email");
    validate.password(password, "password");

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError()(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) {
                        throw new CredentialsError('wrong credentials');
                    }

                    return user._id.toString();
                })
        })
}