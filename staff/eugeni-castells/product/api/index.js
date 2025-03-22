import { data } from "./data/index.js";
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

data
  .connect("mongodb://localhost:27017", "test")
  .catch((error) => console.error(error))
  .then(() => {
    const api = express();

    api.use(cors());

    const jsonBodyParser = json();

    api.get("/posts", jsonBodyParser, (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        return logic
          .getPosts(userId)

          .then((posts) => {
            res.status(200).json(posts);
          })
          .catch((error) => {
            console.error(error);

            let status = 500;
            let errorName = "System Error";

            if (error instanceof NotFoundError) {
              status = 404;
              errorName = NotFoundError.name;
            }
            res
              .status(status)
              .json({ error: errorName, message: error.message });
          });
      } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = "System Error";

        if (error instanceof ValidationError) {
          status = 400;
          errorName = ValidationError.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.post("/posts", jsonBodyParser, (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        const { image, text } = req.body;

        return logic
          .addPost(userId, image, text)
          .then(() => {
            res.status(201).send();
          })
          .catch((error) => {
            let status = 500;
            let errorName = SystemError.name;

            if (error instanceof NotFoundError) {
              status = 404;

              errorName = NotFoundError.name;
            }

            res
              .status(status)
              .send({ error: errorName, message: error.message });
          });
      } catch (error) {
        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;

          errorName = ValidationError.name;
        }

        res.status(status).send({ error: errorName, message: error.message });
      }
    });

    api.delete("/posts/:postId", (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        const { postId } = req.params;

        return logic
          .deletePost(userId, postId)
          .catch((error) => {
            let status = 500;

            let errorName = SystemError.name;

            if (error instanceof NotFoundError) {
              status = 404;
              errorName = NotFoundError.name;
            } else if (error instanceof OwnershipError) {
              status = 403;

              errorName = OwnershipError.name;
            }

            res
              .status(status)
              .res.json({ error: errorName, message: error.message });
          })
          .then(() => {
            res.status(202).send();
          });
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

        res
          .status(status)
          .res.json({ error: errorName, message: error.message });
      }
    });

    api.post("/users/auth", jsonBodyParser, (req, res) => {
      try {
        const { username, password } = req.body;

        return logic
          .authenticateUser(username, password)
          .catch((error) => {
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

            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then((id) => {
            res.status(200).json({ id });
          });
      } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;

          errorName = ValidationError.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.post("/users", jsonBodyParser, (req, res) => {
      try {
        const { name, email, username, password } = req.body;

        return logic
          .registerUser({
            name: name,
            email: email,
            username: username,
            password: password,
          })
          .catch((error) => {
            console.error(error);

            let status = 500;
            let errorName = SystemError.name;

            if (error instanceof ValidationError) {
              status = 400;
              errorName = ValidationError.name;
            }
            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then(() => {
            res.sendStatus(201);
          });
      } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;
          errorName = ValidationError.name;
        }
        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.patch("/users", jsonBodyParser, (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        const body = req.body;

        return logic
          .updateUser(userId, body)
          .catch((error) => {
            console.error(error);

            let status = 500;

            let errorName = SystemError.name;

            if (error instanceof OwnershipError) {
              status = 404;

              errorName = OwnershipError.name;
            } else if (error instanceof NotFoundError) {
              status = 404;

              errorName = NotFoundError.name;
            }
            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then(() => {
            res.status(204).send();
          });
      } catch (error) {
        console.error(error);

        let status = 500;

        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;

          errorName = ValidationError.name;
        }
        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.get("/users/self", (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        return logic
          .getOnlineUserInfo(userId)
          .catch((error) => {
            console.error(error);

            let status = 500;
            let errorName = SystemError.name;

            if (error instanceof OwnershipError) {
              status = 403;

              errorName = OwnershipError.name;
            } else if (error instanceof NotFoundError) {
              status = 404;

              errorName = NotFoundError.name;
            }

            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then((userInfo) => {
            res.status(200).json(userInfo);
          });
      } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;

          errorName = ValidationError.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.patch("/posts/text/:id", jsonBodyParser, (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        const {
          params: { id },
          body: { text },
        } = req;

        return logic
          .updatePostText(userId, id, text)
          .catch((error) => {
            console.error(error);

            let status = 500;
            let errorName = SystemError.name;

            if (error instanceof NotFoundError) {
              status = 404;
              errorName = NotFoundError.name;
            } else if (error instanceof OwnershipError) {
              status = 403;
              errorName = OwnershipError.name;
            }

            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then(() => {
            res.status(200).send();
          });
      } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;
          errorName = ValidationError.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
      }
    });

    api.patch("/posts/likes/:postId", (req, res) => {
      try {
        const { authorization } = req.headers;

        const userId = authorization.slice(6);

        const { postId } = req.params;

        return logic
          .updatePostLikes(userId, postId)
          .catch((error) => {
            console.error(error);

            let status = 500;

            let errorName = SystemError.name;

            if (error instanceof NotFoundError) {
              status = 404;
              errorName = NotFoundError.name;
            }

            res
              .status(status)
              .json({ error: errorName, message: error.message });
          })
          .then(() => {
            res.status(204).send();
          });
      } catch (error) {
        console.error(error);

        let status = 500;

        let errorName = SystemError.name;

        if (error instanceof ValidationError) {
          status = 400;
          errorName = ValidationError.name;
        }
        res.status(status).json({ error: errorName, message: error.message });
      }
    });
    api.listen(8080, () => console.log("api listening in port 8080"));
  });
