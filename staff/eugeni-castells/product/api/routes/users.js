import "dotenv/config";
import jwt from "jsonwebtoken";

import { Router } from "express";

import {
  authHandler,
  jsonBodyParser,
  withErrorHandling,
} from "../handlers/index.js";

import { logic } from "../logic/index.js";

const { JWT_SECRET } = process.env;

export const users = Router();

users.post(
  "/",
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { name, email, username, password } = req.body;
    return logic
      .registerUser({
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then(() => {
        res.sendStatus(201);
      });
  })
);

users.post(
  "/auth",
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { username, password } = req.body;

    return logic.authenticateUser(username, password).then((id) => {
      const token = jwt.sign({ sub: id }, JWT_SECRET);

      res.status(200).json({ token });
    });
  })
);

users.get(
  "/self",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;

    return logic.getOnlineUserInfo(userId).then((userInfo) => {
      res.status(200).json(userInfo);
    });
  })
);

users.patch(
  "/",
  authHandler,
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { userId } = req;

    const body = req.body;

    return logic.updateUser(userId, body).then(() => {
      res.status(204).send();
    });
  })
);
