import "dotenv/config";
import { data } from "./data/index.js";
import express, { json } from "express";
import jwt from "jsonwebtoken";
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

const { JWT_SECRET, PORT, MONGO_URL } = process.env;

const handleWithErrorHandling = (next, callback) => {
  try {
    callback().catch((error) => {
      console.error(error);

      next(error);
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};
data
  .connect(MONGO_URL, "test")
  .catch((error) => console.error(error))
  .then(() => {
    const api = express();

    api.use(cors(), (req, _res, next) => {
      req.eugeni = true;

      next();
    });

    const jsonBodyParser = json();

    api.get("/posts", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const { eugeni } = req;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getPosts(userId).then((posts) => {
          res.status(200).json(posts).send(console.log(eugeni));
        });
      });
    });

    api.post("/posts", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { image, text } = req.body;

        return logic.addPost(userId, image, text).then(() => {
          res.status(201).send();
        });
      });
    });

    api.delete("/posts/:postId", (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.deletePost(userId, postId).then(() => {
          res.status(202).send();
        });
      });
    });

    api.post("/users/auth", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { username, password } = req.body;

        return logic.authenticateUser(username, password).then((id) => {
          const token = jwt.sign({ sub: id }, JWT_SECRET);

          res.status(200).json({ token });
        });
      });
    });

    api.post("/users", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
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
      });
    });

    api.patch("/users", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const body = req.body;

        return logic.updateUser(userId, body).then(() => {
          res.status(204).send();
        });
      });
    });

    api.get("/users/self", (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getOnlineUserInfo(userId).then((userInfo) => {
          res.status(200).json(userInfo);
        });
      });
    });

    api.patch("/posts/text/:id", jsonBodyParser, (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const {
          params: { id },
          body: { text },
        } = req;

        return logic.updatePostText(userId, id, text).then(() => {
          res.status(200).send();
        });
      });
    });

    api.patch("/posts/likes/:postId", (req, res, next) => {
      handleWithErrorHandling(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.updatePostLikes(userId, postId).then(() => {
          res.status(204).send();
        });
      });
    });

    const errorHandler = (error, _req, res, _next) => {
      let status = 500;
      let errorName = SystemError.name;

      if (error instanceof DuplicityError) {
        status = 409;
        errorName = error.constructor.name;
      } else if (error instanceof ValidationError) {
        status = 400;
        errorName = error.constructor.name;
      } else if (error instanceof CredentialsError) {
        status = 401;
        errorName = error.constructor.name;
      } else if (error instanceof NotFoundError) {
        status = 404;
        errorName = error.constructor.name;
      } else if (error instanceof OwnershipError) {
        status = 403;
        errorName = error.constructor.name;
      }

      res.status(status).json({ error: errorName, message: error.message });
    };

    api.use(errorHandler);

    api.listen(PORT, () => console.log(`api listening in port ${PORT}`));
  });
