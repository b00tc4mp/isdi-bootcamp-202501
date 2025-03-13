import express, { json } from "express";

import { logic } from "./logic/index.js";
import {
  CredentialsError,
  OwnershipError,
  DuplicityError,
  SystemError,
  ValidationError,
  NotFoundError,
} from "./logic/errors.js";

const api = express();

const jsonBodyParser = json();

api.get("/posts", jsonBodyParser, (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const posts = logic.getPosts(userId);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    let status = 500;
    let errorName = "System Error";

    if (error instanceof NotFoundError) {
      status = 404;
      errorName = NotFoundError.name;
    }

    res.status(status).json({ error: errorName, message: error.message });
  }
});

api.post("/users/authenticate", jsonBodyParser, (req, res) => {
  try {
    const { username, password } = req.body;

    const id = logic.authenticateUser(username, password);

    res.status(200).send(id);
  } catch (error) {
    console.error(error);

    let status = 500;
    let errorName = SystemError.name;

    if (error instanceof NotFoundError) {
      status = 404;

      errorName = NotFoundError.name;
    } else if (error instanceof CredentialsError) {
      status = 401;

      errorName = CredentialsError.name;
    }

    res.status(status).json({ error: errorName, message: error.message });
  }
});

api.post("/users", jsonBodyParser, (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    logic.registerUser({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(error);

    let status = 500;
    let errorName = SystemError.name;

    if (error instanceof ValidationError) {
      status = 400;
      errorName = ValidationError.name;
    } else if (error instanceof DuplicityError) {
      status = 409;
      errorName = DuplicityError.name;
    }
    res.status(status).json({ error: errorName, message: error.message });
  }
});

api.post("/users/self", (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const name = logic.getOnlineUserName(userId);

    res.status(200).json(name);
  } catch (error) {
    console.error(error);

    let status = 500;
    let errorName = SystemError.name;

    if (error instanceof ValidationError) {
      status = 400;

      errorName = ValidationError.name;
    } else if (error instanceof OwnershipError) {
      status = 403;

      errorName = OwnershipError.name;
    } else if (error instanceof NotFoundError) {
      status = 404;

      errorName = NotFoundError.name;
    }

    res.status(status).json({ error: errorName, message: error.message });
  }
});

api.patch("/posts/:id", jsonBodyParser, (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const {
      params: { id },
      body: { text },
    } = req;

    logic.updatePostText(userId, id, text);

    res.status(200);
  } catch (error) {
    console.error(error);

    let status = 500;
    let errorName = SystemError.name;

    if (error instanceof ValidationError) {
      status = 400;
      errorName = ValidationError.name;
    } else if (error instanceof NotFoundError) {
      status = 404;
      errorName = NotFoundError.name;
    } else if (error instanceof OwnershipError) {
      status = 403;
      errorName = OwnershipError.name;
    }

    res.status(status).json({ error: errorName, message: error.message });
  }
});
api.listen(8080, () => console.log("api listening in port 8080"));
