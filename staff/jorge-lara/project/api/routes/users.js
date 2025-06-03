import { jsonBodyParser, authHandler, withErrorHandling } from "../handler/index.js";
import { Router } from 'express';
import { logic } from "../logic/index.js";

import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const users = Router();

users.post("/", jsonBodyParser, withErrorHandling((req, res) => {
  const { email, username, password } = req.body;

  return logic.registerUser(email, username, password).then(() => res.status(201).send());
}));

users.post("/auth", jsonBodyParser, withErrorHandling((req, res) => {
  const { email, password } = req.body;

  return logic.authenticateUser(email, password)
    .then(id => {
      const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    })
}))

users.get('/self/username', authHandler, withErrorHandling((req, res) => {
  const { userId } = req;

  return logic.getUserUsername(userId)
    .then(username => res.json({ username }))
}))