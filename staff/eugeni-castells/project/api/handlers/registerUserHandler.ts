import { Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { UserFromRequest, CustomRequestBody } from "../types";
import { registerUser } from "../services";

export const registerUserHandler = createFunctionalHandler<UserFromRequest>(
  (req: CustomRequestBody<UserFromRequest>, res: Response) => {
    const { name, username, email, password } = req.body;

    return registerUser(name, username, email, password).then(() => {
      res.status(201).send();
    });
  }
);
