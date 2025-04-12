import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { registerUser } from "../service";

export const registerUserHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    return registerUser(name, username, email, password).then(() => {
      res.status(201).send();
    });
  }
);
