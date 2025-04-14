import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const createToken = (userId, role) => {
  const payload = { userId, role };
  const secret = JWT_SECRET;
  const options = { expiresIn: JWT_EXPIRES_IN };

  return jwt.sign(payload, secret, options);
};
