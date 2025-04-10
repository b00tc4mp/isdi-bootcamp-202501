import { User } from '../lib/models/index.js';
import bcrypt from 'bcryptjs';

export function authenticateUser(username, password) {
    return User.findOne({ username })
        .then(user => {
            if (!user) throw new Error('Invalid credentials');
            return bcrypt.compare(password, user.password).then(match => {
                if (!match) throw new Error('Invalid credentials');
                return user._id.toString();
            });
        });
}