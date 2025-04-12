import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { authenticateUser } from "../service";
import { AuthUserData } from "./types";

export const authenticateUserHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    return authenticateUser(email, password).then((userId) => {
      res.json({ userId });
    });
  }
);
