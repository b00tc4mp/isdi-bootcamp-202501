import express, { json } from "express";
import cors from "cors";
import { logic } from "./logic/index.js";
import { errors } from "../com/index.js";

const {
  CredentialsError,
  OwnershipError,
  DuplicityError,
  SystemError,
  ValidationError,
  NotFoundError,
} = errors;
const api = express();

api.use(cors());

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

api.post("/posts", jsonBodyParser, (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const { image, text } = req.body;

    logic.addPost(userId, { image, text });

    res.status(201).send();
  } catch (error) {
    let status = 500;
    let errorName = SystemError.name;

    if (error instanceof ValidationError) {
      status = 400;

      errorName = ValidationError.name;
    } else if (error instanceof NotFoundError) {
      status = 404;

      errorName = NotFoundError.name;
    }

    res.status(status).send({ error: errorName, message: error.message });
  }
});

api.delete("/posts/:postId", (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const { postId } = req.params;

    logic.deletePost(userId, postId);

    res.status(202).send();
  } catch (error) {
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

    res.status(status).res.json({ error: errorName, message: error.message });
  }
});

api.post("/users/auth", jsonBodyParser, (req, res) => {
  try {
    const { username, password } = req.body;

    const id = logic.authenticateUser(username, password);

    res.status(200).json({ id });
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
    } else if (error instanceof ValidationError) {
      status = 400;

      errorName = ValidationError.name;
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

api.patch("/users", jsonBodyParser, (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const { name, username, email, password } = req.body;

    logic.updateUser(userId, { name, email, username, password });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    let status = 500;

    let errorName = SystemError.name;

    if (error instanceof ValidationError) {
      status = 400;

      errorName = ValidationError.name;
    } else if (error instanceof OwnershipError) {
      status = 404;

      errorName = OwnershipError.name;
    } else if (error instanceof NotFoundError) {
      status = 404;

      errorName = NotFoundError.name;
    }
    res.status(status).json({ error: errorName, message: error.message });
  }
});

api.get("/users/self", (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const name = logic.getOnlineUserInfo(userId);

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

api.patch("/posts/text/:id", jsonBodyParser, (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const {
      params: { id },
      body: { text },
    } = req;

    logic.updatePostText(userId, id, text);

    res.status(200).send();
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

api.patch("/posts/likes/:postId", (req, res) => {
  try {
    const { authorization } = req.headers;

    const userId = authorization.slice(-12);

    const { postId } = req.params;

    logic.updatePostLikes(userId, postId);

    res.status(204).send();
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
    }

    res.status(status).json({ error: errorName, message: error.message });
  }
});
api.listen(8080, () => console.log("api listening in port 8080"));
